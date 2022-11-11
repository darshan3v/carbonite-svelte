<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { NearWallet } from '$src/wallet/near-wallet';

	import { Buffer } from 'buffer';

	// importing types

	import type { WalletConfig } from '../wallet/near-wallet';
	import type { NetworkId, WalletSelector } from '@near-wallet-selector/core';

	const CONTRACT_ID: string = 'carbonite.testnet';
	const NETWORK_TESTNET: NetworkId = 'testnet';

	let walletConfig: WalletConfig = {
		network: NETWORK_TESTNET,
		contractId: CONTRACT_ID,
		createAccessKeyFor: CONTRACT_ID
	};

	let nearWallet: NearWallet;
	let random: string;

	// to check for signed in
	let isSignedIn: boolean = false;

	if (browser) {
		window.Buffer = Buffer;
	}

	onMount(() => {
		setuptWallet(walletConfig);
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
	<button on:click={async () => nearWallet.signOut()}>Sign Out</button>
{/if}
