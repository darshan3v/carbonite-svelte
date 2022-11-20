import { nearWallet, provider } from '$src/wallet/wallet';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const privateKey: string = localStorage.getItem('companyPrivateKey') ?? '';
	const accountId: string = localStorage.getItem('carboniteCompanyAccountId') ?? '';

	// check if company is approved (returns null if not approved)
	const company = await nearWallet.get_company_details({
		account_id: nearWallet.accountId as string
	});

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

		// console.log(await provider.txStatus(txHash, accountId));

		open(account_import_url);
	}
};
