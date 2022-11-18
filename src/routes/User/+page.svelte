<!-- have to register himself by minting nft  -->
<script lang="ts">
	import { nearWallet, setup, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	import Loader from '$src/components/Loader.svelte';
	import UserRegForm from '$src/components/UserRegForm.svelte';

	let Loading = true;

	onMount(async () => {
		setup();
		Loading = false;
	});
</script>

{#if Loading}
	<Loader />
{:else}
	<UserRegForm />
{/if}
<!-- This is user page -->
