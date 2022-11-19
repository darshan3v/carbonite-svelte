import { provider } from '$src/wallet/wallet';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const txHash = url.searchParams.get('transactionHashes');

	if (txHash) {
		const privateKey: string = localStorage.getItem('privateKey') ?? '';
		const accountId: string = localStorage.getItem('carboniteAccountId') ?? '';

		localStorage.removeItem('privateKey');
		localStorage.removeItem('carboniteAccountId');

		// https://wallet.testnet.near.org/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY
		const account_import_url =
			'https://testnet.mynearwallet.com/auto-import-secret-key' + '#' + accountId + '/' + privateKey;

		console.log(await provider.txStatus(txHash, accountId));

		open(account_import_url);
	}
};
