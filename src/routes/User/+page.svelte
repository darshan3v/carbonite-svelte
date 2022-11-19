<!-- have to register himself by minting nft  -->
<script lang="ts">
	import {
		delay,
		getWalletSelector,
		is_carbonite_company_acc,
		is_carbonite_user_acc
	} from '$src/wallet/wallet';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Loader from '$src/components/Loader.svelte';
	import UserRegForm from '$src/components/UserRegForm.svelte';

	import type { WalletSelector } from '@near-wallet-selector/core';
	import type { AccountId } from '$src/wallet/types';

	let Loading = true;

	let loading_msg: string = 'Loading';

	onMount(async () => {
		const walletSelector: WalletSelector = await getWalletSelector();
		const isSignedIn: boolean = walletSelector.isSignedIn();

		let accountId: AccountId;

		if (isSignedIn) {
			accountId = walletSelector.store.getState().accounts[0].accountId;

			if (is_carbonite_user_acc(accountId)) {
				loading_msg = 'Redirecting to User Dashboard';
				await delay(2000);
				goto('/User/Dashboard');
			} else if (is_carbonite_company_acc(accountId)) {
				loading_msg = 'Redirecting to Company Dashboard';
				await delay(2000);
				goto('/Company/Dashboard');
			}
			// console.log('check if user type then redirect to dashboard or else accordingly');
		} else {
			loading_msg = 'Please Sign In with a near Account to register @Carbonite.Club';
			await delay(2000);
			goto('/');
		}
		Loading = false;
	});
</script>

{#if Loading}
	<Loader {loading_msg} />
{:else}
	<UserRegForm />
{/if}
<!-- This is user page -->
