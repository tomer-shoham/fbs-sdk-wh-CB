import startServer from "./server.js";
(() => {
  try {
    console.log("server starting...");
    startServer();
  } catch (e) {
    console.log(e);
  }
})();

// import { readFileSync } from 'fs';
// import * as path from 'path';
// import { Fireblocks, BasePath, TransferPeerPathType, TransactionRequestAmount } from "@fireblocks/ts-sdk";

// const apiKey = "3b453afa-8ecd-4b73-9fe4-d896821a3aa7";

// const secretPath = path.resolve(__dirname, '../secrets/fireblocks_secret.key');
// const secretKey = readFileSync(secretPath, 'utf8');

// const basePath = BasePath.Sandbox;

// // Initialize a Fireblocks API instance with local variables
// const fireblocks = new Fireblocks({
//     apiKey: apiKey,
//     basePath: BasePath.US,
//     secretKey: secretKey,
// });

// fireblocks.apiUser.getApiUsers().then(a => console.log(a)).catch(err => console.error(err));

// async function getApiUsers() {
//     try {
//         const vault = await fireblocks.apiUser.getApiUsers();
//         console.log(JSON.stringify(vault.data, null, 2))
//     } catch (e) {
//         console.log(e);
//     }
// }

// getApiUsers();

// // creating a new vault account
// async function createVault() {
//     try {
//         const vault = await fireblocks.vaults.createVaultAccount({
//             createVaultAccountRequest: {
//                 name: 'My First Vault Account',
//                 hiddenOnUI: false,
//                 autoFuel: false
//             }
//         });
//         console.log(JSON.stringify(vault.data, null, 2))
//     } catch (e) {
//         console.log(e);
//     }
// }

// //retrive vault accounts
// async function getVaultPagedAccounts(limit: number) {
//     try {
//         const vaults = await fireblocks.vaults.getPagedVaultAccounts({
//             limit
//         });
//         console.log(JSON.stringify(vaults.data, null, 2))
//     } catch (e) {
//         console.log(e);
//     }
// }

// // create a transaction
// async function createTransaction(assetId: string, amount: TransactionRequestAmount, srcId: any, destId: any) {
//     let payload = {
//         assetId,
//         amount,
//         source: {
//             type: TransferPeerPathType.VaultAccount,
//             id: String(srcId)
//         },
//         destination: {
//             type: TransferPeerPathType.VaultAccount,
//             id: String(destId)
//         },
//         note: "Your first transaction!"
//     };
//     const result = await fireblocks.transactions.createTransaction({ transactionRequest: payload });
//     console.log(JSON.stringify(result, null, 2));
// }

// // createVault()
// // getVaultPagedAccounts(10)
// // createTransaction("ETH_TEST5", "0.1", "0", "1")
