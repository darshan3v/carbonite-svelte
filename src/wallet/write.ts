import { ONE_FIFTY_TGAS, ONE_NEAR_IN_YOCTO, THIRTY_TGAS } from './constants';
import type {
	accept_invite_args,
	add_task_in_near_token_args,
	approve_ft_tokens_args,
	claim_refund_args,
	edit_company_details_args,
	extend_deadline_args,
	init_args,
	nft_mint_args,
	ping_task_args,
	request_verification_args,
	select_task_args,
	submit_task_args,
	whitelist_companies_args
} from './function_args';
import type { NearWallet } from './near-wallet';

export async function init(this: NearWallet, args: init_args) {
	return await this.callMethod({
		methodName: 'new',
		args,
		gas: ONE_FIFTY_TGAS
	});
}

export async function approve_ft_tokens(this: NearWallet, args: approve_ft_tokens_args) {
	return await this.callMethod({
		methodName: 'approve_ft_tokens',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function request_verification(this: NearWallet, args: request_verification_args) {
	return await this.callMethod({
		methodName: 'request_verification',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function whitelist_companies(this: NearWallet, args: whitelist_companies_args) {
	return await this.callMethod({
		methodName: 'whitelist_companies',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function edit_company_details(this: NearWallet, args: edit_company_details_args) {
	return await this.callMethod({
		methodName: 'edit_company_details',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function nft_mint(this: NearWallet, args: nft_mint_args) {
	return await this.callMethod({
		methodName: 'nft_mint',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function accept_invite(this: NearWallet, args: accept_invite_args) {
	return await this.callMethod({
		methodName: 'accept_invite',
		args,
		gas: THIRTY_TGAS
	});
}

export async function select_task(this: NearWallet, args: select_task_args) {
	return await this.callMethod({
		methodName: 'select_task',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function claim_refund(this: NearWallet, args: claim_refund_args) {
	return await this.callMethod({
		methodName: 'claim_refund',
		args,
		gas: ONE_FIFTY_TGAS
	});
}

export async function add_task_in_near_token(this: NearWallet, args: add_task_in_near_token_args) {
	return await this.callMethod({
		methodName: 'add_task_in_near_token',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}

export async function ping_task(this: NearWallet, args: ping_task_args) {
	return await this.callMethod({
		methodName: 'ping_task',
		args,
		gas: ONE_FIFTY_TGAS
	});
}

export async function extend_deadline(this: NearWallet, args: extend_deadline_args) {
	return await this.callMethod({
		methodName: 'extend_deadline',
		args,
		gas: ONE_FIFTY_TGAS
	});
}

export async function submit_task(this: NearWallet, args: submit_task_args) {
	return await this.callMethod({
		methodName: 'submit_task',
		args,
		gas: ONE_FIFTY_TGAS,
		deposit: ONE_NEAR_IN_YOCTO
	});
}
