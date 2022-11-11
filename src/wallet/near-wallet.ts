// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
// import LedgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';

import { providers } from 'near-api-js';

// wallet selector options
import { setupWalletSelector, type NetworkId } from '@near-wallet-selector/core';
// import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';

// import types
import type { WalletSelector, Wallet } from '@near-wallet-selector/core'

import type { JsonRpcProvider } from 'near-api-js/lib/providers';

export type WalletConfig = {
  network: NetworkId
  contractId: string,
  createAccessKeyFor: string | null,
}

type viewArgs = {
  contractId: string,
  methodName: string,
  args: object,
}

type writeArgs = {
  contractId: string,
  methodName: string,
  args: object,
  gas: string,
  deposit: string
}

export type AadhaarRecord = {
  is_above_18: boolean,
  is_senior_citizen: boolean
}

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

export class NearWallet {

  walletSelector: WalletSelector;
  wallet: Wallet | null;
  walletConfig: WalletConfig;
  accountId: string | null;

  constructor(walletConfig: WalletConfig, walletSelector: WalletSelector) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.walletConfig = walletConfig;
    this.walletSelector = walletSelector;
    this.wallet = null;
    this.accountId = null;

  }

  public static async WithWalletSelector(walletConfig: WalletConfig): Promise<WalletSelector> {
    return await setupWalletSelector({
      network: walletConfig.network,
      modules: [
        setupNearWallet({ iconUrl: NearIconUrl }),
        setupMyNearWallet({ iconUrl: MyNearIconUrl }),
        // setupLedger({ iconUrl: LedgerIconUrl })
      ],
    });
  }

  // To be called when the website loads
  async startUp() {

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      console.log(this.walletSelector.store.getState());
      this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }
  // Sign-in method
  signIn() {
    const description = 'Please select a wallet to sign in.';
    const modal = setupModal(this.walletSelector, { contractId: this.walletConfig.contractId, description });
    modal.show();
  }

  // Sign-out method
  signOut() {
    if (this.wallet) {
      this.wallet.signOut();
      this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
      window.location.replace(window.location.origin + window.location.pathname);
    }
  }

  async viewMethod(viewargs: viewArgs){
    const { network } = this.walletSelector.options;
    const provider: JsonRpcProvider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const {contractId,methodName,args} = viewargs;

    const res = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: methodName,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });

    return JSON.parse(Buffer.from(res.result).toString())

  }

  async callMethod(writeArgs: writeArgs) {
    if (this.wallet){

      const {contractId,methodName,args,gas,deposit} = writeArgs;
      
      const signerId = this.accountId ? this.accountId : '';

      const outcome = await this.wallet.signAndSendTransaction({
        signerId,
        receiverId: contractId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName,
              args,
              gas,
              deposit,
            },
          },
        ],
      });
  
      if(outcome){
        return providers.getTransactionLastResult(outcome)
      }
    }
  }

  async fetchMetadata(){
    const contractId = this.walletConfig.contractId;
    return await this.viewMethod({methodName: 'metadata',contractId: contractId,args: {}})
  }

  async addAadhaaar(id: string,aadhaarRecord: AadhaarRecord){
    const contractId = this.walletConfig.contractId;
    return await this.callMethod({
      methodName: 'add_m_aadhaar_record',
      contractId,
      args: {
        id,
        m_aadhaar: aadhaarRecord
      },
      gas: THIRTY_TGAS,
      deposit: NO_DEPOSIT
    })
  }

}