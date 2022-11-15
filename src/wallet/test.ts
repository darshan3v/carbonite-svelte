import type { init_args } from './function_args';
import type { NearWallet } from './near-wallet';
import type { NFTContractMetadata } from './structs_enums';
import type { AccountId } from './types';

import { connect, keyStores, WalletConnection } from 'near-api-js';
import type { ConnectConfig } from 'near-api-js';

async function test_contract(this: NearWallet) {
	const connectionConfig: ConnectConfig = {
		networkId: 'testnet',
		keyStore: new keyStores.BrowserLocalStorageKeyStore(),
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org',
		headers: {}
	};

	const nearConnection: Near = await connect(connectionConfig);
	const walletConnection = new WalletConnection(nearConnection, '');

	const owner_acc = await nearConnection.account('carbonite.testnet');

	const owner_id: AccountId = owner_acc;
	const nft_contract_metadata: NFTContractMetadata = {
		spec: 'nft-1.0.0',
		name: 'Carbonite.Club',
		symbol: 'Carbonite',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU4IiBoZWlnaHQ9IjIxMSIgdmlld0JveD0iMCAwIDE1OCAyMTEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjM0OTg5OSA0NC4zMTM0TDUyLjM3OTYgOTYuMzE2OEwxMDQuNDA5IDQ0LjI4NzFMNjYuMTgzMSA2LjA3NDA5QzU4LjU1MSAtMS41NTc5OCA0Ni4xOTUgLTEuNTU3OTggMzguNTc2MSA2LjA3NDA5TDAuMzQ5ODk5IDQ0LjI4NzFWNDQuMzEzNFpNMTEzLjY5OSA1My42MDM1TDYxLjY5NiAxMDUuNjMzTDExMy43MjYgMTU3LjY2M0wxNTEuOTM5IDExOS40MzdDMTU5LjU3MSAxMTEuODA1IDE1OS41NzEgOTkuNDQ4NiAxNTEuOTM5IDkxLjgyOTZMMTEzLjcyNiA1My42MDM1SDExMy42OTlaTTEwNC40MDkgMTY2Ljk1M0w1Mi4zNzk2IDExNC45NUwwLjM0OTg5OSAxNjYuOTY2TDM4LjU3NjEgMjA1LjE3OUM0Ni4yMDgxIDIxMi44MTEgNTguNTY0MiAyMTIuODExIDY2LjE4MzEgMjA1LjE3OUwxMDQuNDA5IDE2Ni45NjZWMTY2Ljk1M1oiIGZpbGw9IiNFRUQ1ODEiLz4KPC9zdmc+Cg==',
		base_uri: 'ipfs',
		reference: 'ipfs://carbonite.club',
		reference_hash: 'urObXJxVKvgK+4g0rerOYXmTIxUIeaHYQLhWxpp0M5g='
	};

	const init_args: init_args = {
		owner_id,
		metadata: nft_contract_metadata
	};
}
