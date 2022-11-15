<script lang="ts">
	import { Buffer } from 'buffer';

	import { onMount } from 'svelte';

	import { NearWallet } from '$src/wallet/near-wallet';

	import { env } from '$env/dynamic/public';

	// importing types

	import type { WalletConfig } from '$src/wallet/near-wallet';
	import type { WalletSelector } from '@near-wallet-selector/core';

	// import constants

	import { TESTNET_NETWORK_ID, TESTNET_CONTRACT_ID } from '$src/wallet/constants';

	let nearWallet: NearWallet;
	let isSignedIn: boolean = false;

	let walletConfig: WalletConfig = {
		network: TESTNET_NETWORK_ID,
		contractId: TESTNET_CONTRACT_ID,
		createAccessKeyFor: TESTNET_CONTRACT_ID
	};

	onMount(async () => {
		window.Buffer = Buffer;
		setuptWallet(walletConfig);
		console.log(env);
		window.process = {
			...window.process
		};
		window.process.env = env;
	});

	async function setuptWallet(walletConfig: WalletConfig): Promise<void> {
		const walletSelector: WalletSelector = await NearWallet.WithWalletSelector(walletConfig);

		nearWallet = new NearWallet(walletConfig, walletSelector);

		isSignedIn = await nearWallet.startUp();
	}
</script>

<!-- sign in and sign out button -->
{#if !isSignedIn}
	<button on:click={async () => nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => nearWallet.signOut()}>{nearWallet.accountId}</button>

	<!-- {#await nearWallet.fetchMetadata()}
		<p>..... Fetching .....</p>
	{:then metadata} 
		<p>{JSON.stringify(metadata)}</p>
	{/await} -->

	<button on:click={async () => nearWallet.test_contract()}>Test Contract></button>
{/if}
