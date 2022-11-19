<!-- -------------------------------------------------- -->
<script lang="ts">
	import type { NearWallet } from '$src/wallet/near-wallet';
	import type { Company } from 'src/wallet/structs_enums';
	import Loader from '$src/components/Loader.svelte';
	import { onMount } from 'svelte';
	import type { WalletSelector } from '@near-wallet-selector/core';
	import {
		delay,
		getWalletSelector,
		is_carbonite_company_acc,
		is_carbonite_user_acc
	} from '$src/wallet/wallet';
	import type { AccountId } from '$src/wallet/types';
	import { goto } from '$app/navigation';
	// import {} from '$src/wallet/view';

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
			// console.log('check if company type then redirect to dashboard or else accordingly');
		} else {
			loading_msg = 'Please Sign In with a near Account to register @Carbonite.Club';
			await delay(2000);
			goto('/');
		}
		Loading = false;
	});

	let company: Company = {
		name: 'Company Name',
		icon: '',
		industries: 'Industries',
		description: 'Description',
		location: 'Location',
		reference: 'Reference'
	};

	function request_verification(company: Company) {
		console.log('request_verification', company);
		// wallet.request_verification(company); TODO
	}
</script>

{#if Loading}
	<Loader {loading_msg} />
{:else}
	<!-- this page will have -->
	This is company page

	<!-- company registration (Company(line 23 structs enum)) (call request_verification)  -->

	<form>
		<label for="name">Company Name</label>
		<input type="text" id="name" name="name" bind:value={company.name} />

		<label for="icon">Company Icon(url)</label>
		<input type="text" id="icon" name="icon" bind:value={company.icon} />

		<label for="industries">Company Industries</label>
		<input type="text" id="industries" name="industries" bind:value={company.industries} />

		<label for="description">Company Description</label>
		<input type="text" id="description" name="description" bind:value={company.description} />

		<label for="location">Company Location</label>
		<input type="text" id="location" name="location" bind:value={company.location} />

		<label for="reference">Company Reference</label>
		<input type="text" id="reference" name="reference" bind:value={company.reference} />

		<button type="button" on:click={() => request_verification(company)}>Submit</button>
	</form>
{/if}
