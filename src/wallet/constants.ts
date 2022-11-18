import { utils } from 'near-api-js';

import type { NetworkId } from '@near-wallet-selector/core';

import type { ContractId, Gas, Deposit } from '$src/wallet/types';

export const MAINNET_NETWORK_ID: NetworkId = 'mainnet';
export const TESTNET_NETWORK_ID: NetworkId = 'testnet';

export const MAINNET_CONTRACT_ID: ContractId = 'carbonite.mainnet';
export const TESTNET_CONTRACT_ID: ContractId = 'carbonite.testnet';

export const THIRTY_TGAS: Gas = '30000000000000';
export const ONE_FIFTY_TGAS: Gas = '150000000000000';

export const NO_DEPOSIT: Deposit = '0';
export const ONE_NEAR_IN_YOCTO: Deposit =
	utils.format.parseNearAmount('1') ?? '1000000000000000000000000';
