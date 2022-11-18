import { browser } from '$app/environment';
import type { AccountId } from '$src/wallet/types';
import {
	getWalletSelector,
	is_carbonite_company_acc,
	is_carbonite_user_acc
} from '$src/wallet/wallet';
import type { WalletSelector } from '@near-wallet-selector/core';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {

	// https://wallet.testnet.near.org/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY
	if (browser) {
		const walletSelector: WalletSelector = await getWalletSelector();
		const isSignedIn: boolean = walletSelector.isSignedIn();

		let accountId: AccountId;

		if (isSignedIn) {
			accountId = walletSelector.store.getState().accounts[0].accountId;

			if (is_carbonite_user_acc(accountId)) {
				throw redirect(307, '/User/Dashboard');
			} else if (is_carbonite_company_acc(accountId)) {
				throw redirect(307, '/Company/Dashboard');
			}
			// console.log('check if user type then redirect to dashboard or else accordingly');
		} else {
			throw redirect(307, '/');
		}
	}
};
