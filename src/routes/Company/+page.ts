import { browser } from '$app/environment';
import { nearWallet, setupWallet, walletConfig } from '$src/wallet/wallet';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	if (browser) {
		const privateKey: string = localStorage.getItem('companyPrivateKey') ?? '';
		const accountId: string | null = localStorage.getItem('carboniteCompanyAccountId');

		if (!accountId) {
			return {
				has_company_requested_verification: false
			};
		}

		await setupWallet(walletConfig);
		console.log(accountId);

		const err_msg = url.searchParams.get('errorMessage');

		if (err_msg) {
			localStorage.removeItem('companyPrivateKey');
			localStorage.removeItem('carboniteCompanyAccountId');

			// reset url

			console.log(err_msg);

			return {
				has_company_requested_verification: false
			};
		}

		// url/?errorCode=Error&errorMessage=%257B%2522index%2522%253A0%252C%	check for error and handle

		const has_company_requested_verification = await nearWallet.has_company_requested_verification({
			account_id: accountId
		});

		console.log(has_company_requested_verification);

		if (has_company_requested_verification) {
			return {
				has_company_requested_verification
			};
		}

		const company = await nearWallet.get_company_details({ account_id: accountId });

		console.log(company);

		// check if company is approved (returns null if not approved)
		if (company !== null) {
			localStorage.removeItem('companyPrivateKey');
			localStorage.removeItem('carboniteCompanyAccountId');
			// https://wallet.testnet.near.org/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY
			const account_import_url =
				'https://testnet.mynearwallet.com/auto-import-secret-key' +
				'#' +
				accountId +
				'/' +
				privateKey;

			open(account_import_url);
		}

		return {
			has_company_requested_verification: false
		};

		// show that the company reg is pending
	}
};
