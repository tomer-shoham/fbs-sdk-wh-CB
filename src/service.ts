import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { signTx } from "./utils/signTx";
dotenv.config();

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`.env variable missing - ${key} is required`);
  return value;
};

const botToken = getEnvVariable("CHAT_BOT_TOKEN");
const chatId = getEnvVariable("TELEGRAM_USER_ID");

const bot = new TelegramBot(botToken, { polling: true });

const pendingApprovals = new Map<
  string,
  { requestId: string; resolve: (action: "APPROVE" | "REJECT") => void }
>();

// Listen for the callback query when user clicks the inline button
bot.on("callback_query", (query) => {
  console.log(query);
  const { data, message, from } = query;
  if (!message) return;

  const requestId = data; // The callback query data will hold the requestId

  if (requestId && pendingApprovals.has(requestId)) {
    const action = data.includes("approve") ? "APPROVE" : "REJECT";
    pendingApprovals.get(requestId)?.resolve(action);
    pendingApprovals.delete(requestId);

    bot.sendMessage(
      chatId,
      `${action === "APPROVE" ? "✅" : "❌"} ${action} request ${requestId}`
    );
    bot.answerCallbackQuery(query.id); // Answer the callback query to remove the loading state
  }
});

// Function to send a new signing request with inline buttons
export const txSignRequest = async (requestId: string): Promise<any> => {
  try {
    const actionPromise = new Promise<"APPROVE" | "REJECT">((resolve) => {
      pendingApprovals.set(requestId, { requestId, resolve });
    });

    // Send a message to Telegram with inline approve/reject buttons
    const inlineKeyboard = [
      [
        {
          text: "Approve",
          callback_data: `approve_${requestId}`, // Pass the requestId in the callback_data
        },
        {
          text: "Reject",
          callback_data: `reject_${requestId}`, // Pass the requestId in the callback_data
        },
      ],
    ];

    await bot.sendMessage(
      chatId,
      `🚨 New signing request:\n\nRequest ID: ${requestId}\n\nPlease approve or reject this request.`,
      {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
      }
    );

    // Wait for the user to approve or reject the request
    const action = await actionPromise;
    console.log("Action received:", action);

    // Perform the action (approve/reject) and sign the response
    const signedResponse = signTx(requestId, action);
    return signedResponse;
  } catch (err: any) {
    throw new Error(`txSignRequest error - ${err.message}`);
  }
};
