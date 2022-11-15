import type { init_args, nft_mint_args,whitelist_companies_args } from './function_args';
import type { NearWallet } from './near-wallet';
import type { Company, NFTContractMetadata } from './structs_enums';
import type { AccountId } from './types';

import type { Account, ConnectConfig } from 'near-api-js';

import { connect, keyStores, Near, KeyPair } from 'near-api-js';

async function test_contract(this: NearWallet) {
	const homedir = (await import('os')).homedir();
	const CREDENTIALS_DIR = '.near-credentials';
	const credentialsPath = (await import('path')).join(homedir, CREDENTIALS_DIR);

	const local_key_store = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
	const browser_key_store = new keyStores.BrowserLocalStorageKeyStore();

	const connectionConfig: ConnectConfig = {
		networkId: 'testnet',
		keyStore: local_key_store,
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org',
		headers: {}
	};

	const nearConnection: Near = await connect(connectionConfig);

	const owner_acc: Account = await nearConnection.account('carbonite.testnet');

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
		owner_id: owner_acc.accountId,
		metadata: nft_contract_metadata
	};

	// initialise the contract
	console.log(await this.init(init_args));

	// 	creating a user sub account
	const akhil_user_id: AccountId = 'akhil.carbonite.testnet';
	const akhil_user_key: KeyPair = KeyPair.fromRandom('ed25519');

	local_key_store.setKey('testnet',akhil_user_id,akhil_user_key);
	browser_key_store.setKey('testnet',akhil_user_id,akhil_user_key);

	const akhil_acc: Account = await nearConnection.account(akhil_user_id);

	const nft_mint_args: nft_mint_args = {
		receiver_id: akhil_user_id,
		title: 'Akhil',
		description: 'I am on the tech team of Carbonite',
		public_key: akhil_user_key.getPublicKey().toString()
	};

	console.log(await this.nft_mint(nft_mint_args));

	// whitelist a company

	const carbonite_company: Company = {
		name: 'Carbonite',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU4IiBoZWlnaHQ9IjIxMSIgdmlld0JveD0iMCAwIDE1OCAyMTEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjM0OTg5OSA0NC4zMTM0TDUyLjM3OTYgOTYuMzE2OEwxMDQuNDA5IDQ0LjI4NzFMNjYuMTgzMSA2LjA3NDA5QzU4LjU1MSAtMS41NTc5OCA0Ni4xOTUgLTEuNTU3OTggMzguNTc2MSA2LjA3NDA5TDAuMzQ5ODk5IDQ0LjI4NzFWNDQuMzEzNFpNMTEzLjY5OSA1My42MDM1TDYxLjY5NiAxMDUuNjMzTDExMy43MjYgMTU3LjY2M0wxNTEuOTM5IDExOS40MzdDMTU5LjU3MSAxMTEuODA1IDE1OS41NzEgOTkuNDQ4NiAxNTEuOTM5IDkxLjgyOTZMMTEzLjcyNiA1My42MDM1SDExMy42OTlaTTEwNC40MDkgMTY2Ljk1M0w1Mi4zNzk2IDExNC45NUwwLjM0OTg5OSAxNjYuOTY2TDM4LjU3NjEgMjA1LjE3OUM0Ni4yMDgxIDIxMi44MTEgNTguNTY0MiAyMTIuODExIDY2LjE4MzEgMjA1LjE3OUwxMDQuNDA5IDE2Ni45NjZWMTY2Ljk1M1oiIGZpbGw9IiNFRUQ1ODEiLz4KPC9zdmc+Cg==',
		industries: 'Blockchain Web3 HumanResource',
		description: 'on chain anonymous Identity Builder',
		location: null,
		reference: 'https://www.carbonite.club/'
	};

	const carbonite_company_id: AccountId = 'carbonite-Co.carbonite.testnet';
	const akhil_user_key: KeyPair = KeyPair.fromRandom('ed25519');

	local_key_store.setKey('testnet',akhil_user_id,akhil_user_key);
	browser_key_store.setKey('testnet',akhil_user_id,akhil_user_key);
	const whitelist_companies_args: whitelist_companies_args= {
		companies: [[carbonite_company_id,carbonite_company,carbonite_key.getPublicKey().toString()]]
	}


	console.log(this.whitelist_companies(whitelist_companies_args));
}
