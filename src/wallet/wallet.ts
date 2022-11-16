import { Buffer } from 'buffer';

import { writable, type Writable } from 'svelte/store';
import { NearWallet } from '$src/wallet/near-wallet';

import { env } from '$env/dynamic/public';

// import constants
import { TESTNET_NETWORK_ID, TESTNET_CONTRACT_ID } from '$src/wallet/constants';

// importing types
import type { WalletConfig } from '$src/wallet/near-wallet';
import type { WalletSelector } from '@near-wallet-selector/core';

export let nearWallet: NearWallet;
export const isSignedIn: Writable<boolean> = writable(false);

const walletConfig: WalletConfig = {
	network: TESTNET_NETWORK_ID,
	contractId: TESTNET_CONTRACT_ID,
	createAccessKeyFor: TESTNET_CONTRACT_ID
};

async function setuptWallet(walletConfig: WalletConfig): Promise<void> {
	const walletSelector: WalletSelector = await NearWallet.WithWalletSelector(walletConfig);

	nearWallet = new NearWallet(walletConfig, walletSelector);

	isSignedIn.set(await nearWallet.startUp());
}

// Other extra stuff ('')!
window.Buffer = Buffer;
setuptWallet(walletConfig);
console.log('env', env);
window.process = {
	...window.process
};
window.process.env = env;
