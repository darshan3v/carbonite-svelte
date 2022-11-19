<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$src/components/Loader.svelte';
	import type { AccountId } from '$src/wallet/types';
	import {
		delay,
		getWalletSelector,
		is_carbonite_company_acc,
		is_carbonite_user_acc
	} from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	let Loading: boolean = true;
	let loading_msg: string = 'Loading';

	onMount(async () => {
		const walletSelector = await getWalletSelector();
		const isSignedIn = walletSelector.isSignedIn();

		let accountId: AccountId;

		if (!isSignedIn) {
			loading_msg = 'Sign in to view your Dashboard';
			await delay(1000);
			goto('/');
		} else {
			accountId = walletSelector.store.getState().accounts[0].accountId;
			if (is_carbonite_company_acc(accountId)) {
				loading_msg = 'Redirecting to Company Dashboard';
				await delay(2000);
				goto('/Company/Dashboard');
			} else if (!is_carbonite_user_acc(accountId)) {
				loading_msg = "Sign in with your Carbonite Account to view Dashboard";
				await delay(2000);
				goto('/User');
			}
			// console.log('Check if user type account , else redirect according to account type');
		}
		Loading = false;
	});
</script>

{#if Loading}
	<Loader {loading_msg} />
{:else}
	<slot />
{/if}
