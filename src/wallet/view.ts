import type {
	get_all_tasks_list_args,
	get_approved_ft_tokens_list_args,
	get_company_details_args,
	get_pending_companies_list_args,
	get_recognised_skills_list_args,
	get_submissions_for_task_list_args,
	get_submission_details_args,
	get_tasks_from_company_list_args,
	get_task_details_args,
	get_invited_tasks_for_user_list_args,
	get_whitelisted_companies_list_args,
	nft_supply_for_owner_args,
	nft_tokens_args,
	nft_tokens_for_owner_args,
	nft_token_args
} from './function_args';

import type { NearWallet } from './near-wallet';

import type {
	CompanyRegDetails,
	JsonCompany,
	JsonSubmission,
	JsonTask,
	JsonToken,
	NFTContractMetadata
} from './structs_enums';

import type { AccountId, Option, U128, Vec, Skills, ContractId, TaskId } from './types';

// write a general way to get running function name instead of writing it explicity and also make type checks on response though they will always be correct

export async function nft_metadata(this: NearWallet): Promise<NFTContractMetadata> {
	return (await this.viewMethod({
		methodName: 'nft_metadata'
	})) as NFTContractMetadata;
}

export async function nft_total_supply(this: NearWallet): Promise<U128> {
	return (await this.viewMethod({
		methodName: 'nft_total_supply'
	})) as U128;
}

export async function nft_tokens(this: NearWallet, args: nft_tokens_args): Promise<Vec<JsonToken>> {
	return (await this.viewMethod({
		methodName: 'nft_tokens',
		args
	})) as Vec<JsonToken>;
}

export async function nft_supply_for_owner(
	this: NearWallet,
	args: nft_supply_for_owner_args
): Promise<U128> {
	return (await this.viewMethod({
		methodName: 'nft_supply_for_owner',
		args
	})) as U128;
}

export async function nft_tokens_for_owner(
	this: NearWallet,
	args: nft_tokens_for_owner_args
): Promise<Vec<JsonToken>> {
	return (await this.viewMethod({
		methodName: 'nft_tokens_for_owner',
		args
	})) as Vec<JsonToken>;
}

export async function nft_token(
	this: NearWallet,
	args: nft_token_args
): Promise<Option<JsonToken>> {
	return (await this.viewMethod({
		methodName: 'nft_token',
		args
	})) as Option<JsonToken>;
}

export async function get_owner(this: NearWallet): Promise<AccountId> {
	return (await this.viewMethod({
		methodName: 'get_owner'
	})) as AccountId;
}

export async function get_recognised_skills_list(
	this: NearWallet,
	args: get_recognised_skills_list_args
): Promise<Vec<Skills>> {
	return (await this.viewMethod({
		methodName: 'get_recognised_skills_list',
		args
	})) as Vec<Skills>;
}

export async function get_company_details(
	this: NearWallet,
	args: get_company_details_args
): Promise<Option<JsonCompany>> {
	return (await this.viewMethod({
		methodName: 'get_company_details',
		args
	})) as Option<JsonCompany>;
}

export async function get_pending_companies_list(
	this: NearWallet,
	args: get_pending_companies_list_args
): Promise<Vec<CompanyRegDetails>> {
	return (await this.viewMethod({
		methodName: 'get_pending_companies_list',
		args
	})) as Vec<CompanyRegDetails>;
}

export async function get_whitelisted_companies_list(
	this: NearWallet,
	args: get_whitelisted_companies_list_args
): Promise<Vec<JsonCompany>> {
	return (await this.viewMethod({
		methodName: 'get_whitelisted_companies_list',
		args
	})) as Vec<JsonCompany>;
}

export async function get_approved_ft_tokens_list(
	this: NearWallet,
	args: get_approved_ft_tokens_list_args
): Promise<Vec<ContractId>> {
	return (await this.viewMethod({
		methodName: 'get_approved_ft_tokens_list',
		args
	})) as Vec<ContractId>;
}

export async function get_task_details(
	this: NearWallet,
	args: get_task_details_args
): Promise<Option<JsonTask>> {
	return (await this.viewMethod({
		methodName: 'get_task_details',
		args
	})) as Option<JsonTask>;
}

export async function get_invited_tasks_for_user_list(
	this: NearWallet,
	args: get_invited_tasks_for_user_list_args
): Promise<Array<TaskId>> {
	return (await this.viewMethod({
		methodName: 'get_invited_tasks_for_user_list',
		args
	})) as Array<TaskId>;
}

export async function get_all_tasks_list(
	this: NearWallet,
	args: get_all_tasks_list_args
): Promise<Vec<JsonTask>> {
	return (await this.viewMethod({
		methodName: 'get_all_tasks_list',
		args
	})) as Vec<JsonTask>;
}

export async function get_tasks_from_company_list(
	this: NearWallet,
	args: get_tasks_from_company_list_args
): Promise<Vec<JsonTask>> {
	return (await this.viewMethod({
		methodName: 'get_tasks_from_company_list',
		args
	})) as Vec<JsonTask>;
}

export async function get_submission_details(
	this: NearWallet,
	args: get_submission_details_args
): Promise<Option<JsonSubmission>> {
	return (await this.viewMethod({
		methodName: 'get_submission_details',
		args
	})) as Option<JsonSubmission>;
}

export async function get_submissions_for_task_list(
	this: NearWallet,
	args: get_submissions_for_task_list_args
): Promise<Vec<JsonSubmission>> {
	return (await this.viewMethod({
		methodName: 'get_submissions_for_task_list',
		args
	})) as Vec<JsonSubmission>;
}
