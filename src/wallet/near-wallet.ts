// wallet selector options

import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
// import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
// import { setupHereWallet } from "@near-wallet-selector/here-wallet";
// import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import { setupSender } from '@near-wallet-selector/sender';
import { setupMathWallet } from '@near-wallet-selector/math-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { setupNearFi } from '@near-wallet-selector/nearfi';
import { setupWalletConnect } from '@near-wallet-selector/wallet-connect';
import { setupCoin98Wallet } from '@near-wallet-selector/coin98-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupOptoWallet } from '@near-wallet-selector/opto-wallet';

// wallet selector UI

import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';

// other imports

import { providers } from 'near-api-js';
import type { JsonRpcProvider } from 'near-api-js/lib/providers';

import { setupWalletSelector } from '@near-wallet-selector/core';

// import types
import type { WalletSelector, Wallet, NetworkId } from '@near-wallet-selector/core';
import type {
	ContractId,
	Gas,
	Deposit,
	viewMethods,
	writeMethods,
	Option,
	AccountId
} from '$src/wallet/types';

export type WalletConfig = {
	network: NetworkId;
	contractId: ContractId;
	createAccessKeyFor: Option<ContractId>; // optional
};

type viewCallArgs = {
	contractId: Option<ContractId>; // if null use contractId from wallet
	methodName: viewMethods;
	args: object;
};

type writeCallArgs = {
	contractId: Option<ContractId>;
	methodName: writeMethods;
	args: object;
	gas: Gas; // if null use DEFAULT GAS = THIRTY_TGAS
	deposit: Deposit; // if null means DEFAULT_DEPOSIT = NO_DEPOSIT
};

// export type AadhaarRecord = {
//   is_above_18: boolean,
//   is_senior_citizen: boolean
//   };

export class NearWallet {
	walletSelector: WalletSelector;
	wallet: Option<Wallet>;
	walletConfig: WalletConfig;
	accountId: Option<AccountId>;

	constructor(walletConfig: WalletConfig, walletSelector: WalletSelector) {
		this.walletConfig = walletConfig;
		this.walletSelector = walletSelector;
		this.wallet = null;
		this.accountId = null;
	}

	public static async WithWalletSelector(walletConfig: WalletConfig): Promise<WalletSelector> {
		return await setupWalletSelector({
			network: walletConfig.network,
			modules: [
				// ...(await setupDefaultWallets()),
				setupNearWallet(),
				setupMyNearWallet(),
				setupSender(),
				setupMathWallet(),
				setupNightly(),
				setupMeteorWallet(),
				setupWelldoneWallet(),
				// setupHereWallet(),
				setupCoin98Wallet(),
				setupNearFi(),
				setupNeth({
					gas: '300000000000000',
					bundle: false
				}),
				setupOptoWallet(),
				setupWalletConnect({
					projectId: 'c4f79cc...',
					metadata: {
						name: 'NEAR Wallet Selector',
						description: 'Example dApp used by NEAR Wallet Selector',
						url: 'https://github.com/near/wallet-selector',
						icons: ['https://avatars.githubusercontent.com/u/37784886']
					}
				})
				// setupNightlyConnect({
				//   url: "wss://relay.nightly.app/app",
				//   appMetadata: {
				//     additionalInfo: "",
				//     application: "NEAR Wallet Selector",
				//     description: "Example dApp used by NEAR Wallet Selector",
				//     icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
				//   },
				// }),
			]
		});
	}

	// To be called when the website loads
	async startUp() {
		const isSignedIn = this.walletSelector.isSignedIn();

		if (isSignedIn) {
			this.wallet = await this.walletSelector.wallet();
			console.log(this.walletSelector.store.getState());
			this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
		} else {
			this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
		}

		return isSignedIn;
	}

	signIn() {
		const description = 'Please select a wallet to sign in.';
		const modal = setupModal(this.walletSelector, {
			contractId: this.walletConfig.contractId,
			description
		});
		modal.show();
	}

	signOut() {
		if (this.wallet) {
			this.wallet.signOut();
			this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
			window.location.replace(window.location.origin + window.location.pathname);
		} else {
			throw new Error('Already Logged out');
		}
	}

	async viewMethod(viewargs: viewCallArgs) {
		const { network } = this.walletSelector.options;
		const provider: JsonRpcProvider = new providers.JsonRpcProvider({ url: network.nodeUrl });

		const { contractId, methodName, args } = viewargs;

		const contract_id = contractId ?? this.walletConfig.contractId;

		const res = await provider.query({
			request_type: 'call_function',
			account_id: contract_id,
			method_name: methodName,
			args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
			finality: 'optimistic'
		});

		return JSON.parse(Buffer.from((res as any).result).toString());
	}

	async callMethod(writeArgs: writeCallArgs) {
		let signerId;

		if (this.wallet) {
			const { contractId, methodName, args, gas, deposit } = writeArgs;

			const contract_id = contractId ?? this.walletConfig.contractId;

			if (this.accountId) {
				signerId = this.accountId;
			} else {
				throw new Error('No signer to sign write Call');
			}

			try {
				await this.wallet.signAndSendTransaction({
					signerId,
					receiverId: contract_id,
					actions: [
						{
							type: 'FunctionCall',
							params: {
								methodName,
								args,
								gas,
								deposit
							}
						}
					],
					callbackUrl: 'http://127.0.0.1:5173/'
				});
			} catch (err) {
				console.log(err);
			}
		}
	}

	// async fetchMetadata() {
	//   const contractId = this.walletConfig.contractId;
	//   return await this.viewMethod({ methodName: 'metadata', contractId: contractId, args: {} })
	// }

	// async addAadhaaar(id: string, aadhaarRecord: AadhaarRecord) {

	//     const contractId = this.walletConfig.contractId;
	//     await this.callMethod({
	//       methodName: 'add_m_aadhaar_record',
	//       contractId,
	//       args: {
	//         id,
	//         m_aadhaar: aadhaarRecord
	//       },
	//       gas: THIRTY_TGAS,
	//       deposit: NO_DEPOSIT
	//     });
	//   }
}
