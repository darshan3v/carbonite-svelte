<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { NearWallet } from '$src/wallet/near-wallet';

	import { Buffer } from 'buffer';

	// importing types

	import type { WalletConfig,AadhaarRecord } from '../wallet/near-wallet';
	import type { NetworkId, WalletSelector } from '@near-wallet-selector/core';

	const CONTRACT_ID: string = 'carbonite.testnet';
	const NETWORK_TESTNET: NetworkId = 'testnet';
	// export const ssr = false;
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


	async function addRecord() {
		if (browser){
			const id = 'darshan.testnet'
			const aadhaarRecord: AadhaarRecord = {
				is_above_18: true,
				is_senior_citizen: false
			}
			console.log(await nearWallet.addAadhaaar(id,aadhaarRecord));
		}

	}

</script>

<!-- sign in and sign out button -->
{#if !isSignedIn}
	<button on:click={async () => nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => nearWallet.signOut()}>{nearWallet.accountId}</button>
	{#await nearWallet.fetchMetadata()}
		<p>..... Fetching .....</p>
	{:then metadata} 
		<p>{JSON.stringify(metadata)}</p>
	{/await}

	<button on:click={async () => addRecord()}>addRecord</button>

{/if}
