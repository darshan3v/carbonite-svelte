import { browser } from '$app/environment';
import { getWalletSelector } from '$src/wallet/wallet';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const isSignedIn = (await getWalletSelector()).isSignedIn();

		if (isSignedIn) {
			console.log('check if company type then redirect to dashboard or else accordingly');
			throw redirect(307, '/');
		}
	}
};
