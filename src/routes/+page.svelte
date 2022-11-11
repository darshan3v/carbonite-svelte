<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

    import {NearWallet} from '$src/wallet/near-wallet';

	import {Buffer} from 'buffer';

	// importing types

	import type { WalletConfig } from '../wallet/near-wallet';
	import type { NetworkId, WalletSelector } from '@near-wallet-selector/core';

	const CONTRACT_ID: string = 'carbonite.testnet';
	const NETWORK_TESTNET: NetworkId = 'testnet';

	let walletConfig: WalletConfig = {
        network: NETWORK_TESTNET,
		contractId: CONTRACT_ID,
		createAccessKeyFor: CONTRACT_ID
    }

	let nearWallet: NearWallet; 
	let random: string;

	if (browser){
		window.Buffer = Buffer;
	}

	onMount(() => {
        setuptWallet(walletConfig);
    });

	async function setuptWallet(walletConfig: WalletConfig): Promise<void> {
		const walletSelector: WalletSelector = await NearWallet.WithWalletSelector(walletConfig);

		nearWallet = new NearWallet(walletConfig, walletSelector);

		const isSignedIn: boolean = await nearWallet.startUp();

		// console.log(isSignedIn);

		if (!isSignedIn) {
			nearWallet.signIn();
		}else{
			nearWallet.signOut();
		}
	}
</script>

<p>{random}</p>
