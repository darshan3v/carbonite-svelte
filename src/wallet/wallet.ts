import { Buffer } from 'buffer';

import { NearWallet } from '$src/wallet/near-wallet';

import { env } from '$env/dynamic/public';

// import constants
import { TESTNET_NETWORK_ID, TESTNET_CONTRACT_ID } from '$src/wallet/constants';

// importing types
import type { WalletConfig } from '$src/wallet/near-wallet';
import type { WalletSelector } from '@near-wallet-selector/core';

export const walletConfig: WalletConfig = {
	network: TESTNET_NETWORK_ID,
	contractId: TESTNET_CONTRACT_ID,
	createAccessKeyFor: TESTNET_CONTRACT_ID
};

export let nearWallet: NearWallet

export async function  getWalletSelector() {
	return await NearWallet.WithWalletSelector(walletConfig);
}

export async function setupWallet(walletConfig: WalletConfig): Promise<boolean> {
	const walletSelector: WalletSelector = await NearWallet.WithWalletSelector(walletConfig);

	nearWallet = new NearWallet(walletConfig, walletSelector);

	return await nearWallet.startUp()
}

// Other extra stuff ('')!
export function setup(){
	window.Buffer = Buffer;
	console.log('env', env);
	window.process = {
		...window.process
	};
	window.process.env = env;
}
