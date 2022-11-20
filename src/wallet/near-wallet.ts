// wallet selector options

import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
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
// import { setupNeth } from '@near-wallet-selector/neth';
import { setupOptoWallet } from '@near-wallet-selector/opto-wallet';

// wallet selector UI

import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';

// other imports

import { providers } from 'near-api-js';

import { setupWalletSelector } from '@near-wallet-selector/core';

// import types
import type { WalletSelector, Wallet, NetworkId } from '@near-wallet-selector/core';
import type { JsonRpcProvider } from 'near-api-js/lib/providers';
import type {
	ContractId,
	Gas,
	Deposit,
	viewMethods,
	writeMethods,
	Option,
	AccountId
} from '$src/wallet/types';

// import constants
import { NO_DEPOSIT, THIRTY_TGAS } from './constants';
import {
	get_all_tasks_list,
	get_approved_ft_tokens_list,
	get_company_details,
	get_owner,
	get_recognised_skills_list,
	get_submissions_for_task_list,
	get_submission_details,
	get_tasks_from_company_list,
	get_task_details,
	get_whitelisted_companies_list,
	nft_metadata,
	nft_supply_for_owner,
	nft_token,
	nft_tokens,
	nft_tokens_for_owner,
	nft_total_supply
} from './view';
import {
	accept_invite,
	add_task_in_near_token,
	approve_ft_tokens,
	request_verification,
	claim_refund,
	edit_company_details,
	extend_deadline,
	init,
	nft_mint,
	ping_task,
	select_task,
	submit_task,
	whitelist_companies
} from './write';
import { test_contract } from './test';

export type WalletConfig = {
	network: NetworkId;
	contractId: ContractId;
	createAccessKeyFor: Option<ContractId>; // Default contractId = this.walletConfig.contractId
};

type viewCallArgs = {
	contractId?: ContractId; // Default contractId = this.walletConfig.contractId
	methodName: viewMethods;
	args?: object;
};

type writeCallArgs = {
	contractId?: ContractId;
	methodName: writeMethods;
	args: object;
	gas?: Gas; // DEFAULT_GAS = THIRTY_TGAS
	deposit?: Deposit; // DEFAULT_DEPOSIT = NO_DEPOSIT
};

// near-api-js accountId class can be used to create accountId object from the responses and then can use near-api-js methods on it

export class NearWallet {
	walletSelector: WalletSelector;
	wallet: Option<Wallet>;
	walletConfig: WalletConfig;
	accountId: Option<AccountId>;

	// view calls
	nft_metadata = nft_metadata.bind(this);
	nft_total_supply = nft_total_supply.bind(this);
	nft_tokens = nft_tokens.bind(this);
	nft_supply_for_owner = nft_supply_for_owner.bind(this);
	nft_tokens_for_owner = nft_tokens_for_owner.bind(this);
	nft_token = nft_token.bind(this);
	get_owner = get_owner.bind(this);
	get_recognised_skills_list = get_recognised_skills_list.bind(this);
	get_company_details = get_company_details.bind(this);
	get_whitelisted_companies_list = get_whitelisted_companies_list.bind(this);
	get_approved_ft_tokens_list = get_approved_ft_tokens_list.bind(this);
	get_task_details = get_task_details.bind(this);
	get_all_tasks_list = get_all_tasks_list.bind(this);
	get_tasks_from_company_list = get_tasks_from_company_list.bind(this);
	get_submission_details = get_submission_details.bind(this);
	get_submissions_for_task_list = get_submissions_for_task_list.bind(this);

	// write calls
	init = init.bind(this);
	approve_ft_tokens = approve_ft_tokens.bind(this);
	request_verification = request_verification.bind(this);
	whitelist_companies = whitelist_companies.bind(this);
	edit_company_details = edit_company_details.bind(this);
	nft_mint = nft_mint.bind(this);
	accept_invite = accept_invite.bind(this);
	select_task = select_task.bind(this);
	claim_refund = claim_refund.bind(this);
	add_task_in_near_token = add_task_in_near_token.bind(this);
	ping_task = ping_task.bind(this);
	extend_deadline = extend_deadline.bind(this);
	submit_task = submit_task.bind(this);

	test_contract = test_contract.bind(this);

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
				setupMyNearWallet(),
				setupSender(),
				setupMathWallet(),
				setupNightly(),
				setupMeteorWallet(),
				setupWelldoneWallet(),
				// setupHereWallet(),
				setupCoin98Wallet(),
				setupNearFi(),
				// setupNeth({
				// 	gas: '300000000000000',
				// 	bundle: false
				// }),
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
		const SignedIn = this.walletSelector.isSignedIn();

		if (SignedIn) {
			this.wallet = await this.walletSelector.wallet();
			console.log('this.walletSelector.store.getState()', this.walletSelector.store.getState());
			this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
		} else {
			this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
		}

		return SignedIn;
	}

	async signIn() {
		const description = 'Please select a wallet to sign in.';
		const modal = setupModal(this.walletSelector, {
			contractId: this.walletConfig.contractId,
			description
		});
		modal.show();

		await this.startUp();
	}

	async signOut() {
		if (this.wallet) {
			this.wallet.signOut();
			this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
			window.location.replace(window.location.origin + window.location.pathname);
		} else {
			throw new Error('Already Logged out');
		}

		await this.startUp();
	}

	async viewMethod(viewargs: viewCallArgs) {
		const { network } = this.walletSelector.options;
		const provider: JsonRpcProvider = new providers.JsonRpcProvider({ url: network.nodeUrl });

		const { contractId, methodName, args } = viewargs;

		const ContractId = contractId ?? this.walletConfig.contractId;

		const Args = args ?? {};

		const res = await provider.query({
			request_type: 'call_function',
			account_id: ContractId,
			method_name: methodName,
			args_base64: Buffer.from(JSON.stringify(Args)).toString('base64'),
			finality: 'optimistic'
		});

		return JSON.parse(Buffer.from((res as any).result).toString());
	}

	async callMethod(writeArgs: writeCallArgs) {
		let signerId;

		if (this.wallet) {
			const { contractId, methodName, args, gas, deposit } = writeArgs;

			const ContractId = contractId ?? this.walletConfig.contractId;

			const Gas = gas ?? THIRTY_TGAS;

			const Deposit = deposit ?? NO_DEPOSIT;

			if (this.accountId) {
				signerId = this.accountId;
			} else {
				throw new Error('No signer to sign write Call');
			}

			try {
				const outcome = await this.wallet.signAndSendTransaction({
					signerId,
					receiverId: ContractId,
					actions: [
						{
							type: 'FunctionCall',
							params: {
								methodName,
								args,
								gas: Gas,
								deposit: Deposit
							}
						}
					]
					// callbackUrl: '/'
				});

				return outcome;

				// if(outcome){
				// 	await getTransactionLastResult(outcome)
				// }
			} catch (err) {
				console.log('err', err);
			}
		} else {
			throw new Error('No Account Logged in to sign the call');
		}
	}
}
