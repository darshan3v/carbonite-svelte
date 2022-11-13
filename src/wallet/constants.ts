import type { NetworkId } from '@near-wallet-selector/core';

import type { ContractId, Gas, Deposit } from '$src/wallet/types';

export const MAINNET_NETWORK_ID: NetworkId = 'mainnet';
export const TESTNET_NETWORK_ID: NetworkId = 'testnet';

export const MAINNET_CONTRACT_ID: ContractId = 'carbonite.mainnet';
export const TESTNET_CONTRACT_ID: ContractId = 'carbonite.testnet';

export const THIRTY_TGAS: Gas = '30000000000000';

export const NO_DEPOSIT: Deposit = '0';
