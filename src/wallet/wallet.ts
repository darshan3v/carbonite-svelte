import { Buffer } from 'buffer';

import { NearWallet } from '$src/wallet/near-wallet';

import { env } from '$env/dynamic/public';

import { providers } from 'near-api-js';

// import constants
import { TESTNET_NETWORK_ID, TESTNET_CONTRACT_ID, TESTNET_NODE_URL } from '$src/wallet/constants';

// importing types
import type { WalletConfig } from '$src/wallet/near-wallet';
import type { WalletSelector } from '@near-wallet-selector/core';
import type { AccountId } from './types';
import { JsonRpcProvider, TypedError } from 'near-api-js/lib/providers';

export const walletConfig: WalletConfig = {
	network: TESTNET_NETWORK_ID,
	contractId: TESTNET_CONTRACT_ID,
	createAccessKeyFor: TESTNET_CONTRACT_ID
};

export const provider: JsonRpcProvider = new providers.JsonRpcProvider({ url: TESTNET_NODE_URL });

export let nearWallet: NearWallet;

export async function getWalletSelector() {
	return await NearWallet.WithWalletSelector(walletConfig);
}

export async function setupWallet(walletConfig: WalletConfig): Promise<boolean> {
	const walletSelector: WalletSelector = await getWalletSelector();

	nearWallet = new NearWallet(walletConfig, walletSelector);

	return await nearWallet.startUp();
}

export function is_carbonite_user_acc(accountId: AccountId) {
	const username = accountId.slice(0, accountId.indexOf('.'));
	const subaccount = accountId.slice(accountId.indexOf('.') + 1);

	return username !== '' && subaccount === TESTNET_CONTRACT_ID && !username.endsWith('-co');
}

export function is_carbonite_company_acc(accountId: AccountId) {
	const company_name = accountId.slice(0, accountId.indexOf('.'));
	const subaccount = accountId.slice(accountId.indexOf('.') + 1);

	return company_name.endsWith('-co') && subaccount === TESTNET_CONTRACT_ID;
}

export async function doesAccountExist(account_id: AccountId) {
	try {
		await provider.query({
			request_type: 'view_account',
			account_id: account_id,
			finality: 'final'
		});
		return true;
	} catch (err: unknown) {
		if (err instanceof TypedError) {
			if (err.type === 'AccountDoesNotExist') {
				return false;
			}
		}
	}
	return true;
}

export async function delay(time_in_ms: number) {
	return new Promise((res) => {
		setTimeout(res, time_in_ms);
	});
}

// Other extra stuff ('')!
window.Buffer = Buffer;
console.log('env', env);
window.process = {
	...window.process
};
window.process.env = env;
// }
