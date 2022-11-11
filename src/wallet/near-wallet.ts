// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
// import LedgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';

// wallet selector options
import { setupWalletSelector, type NetworkId } from '@near-wallet-selector/core';
// import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';

// import types
import type { WalletSelector, Wallet } from '@near-wallet-selector/core'

export type WalletConfig = {
  network: NetworkId
  contractId: string,
  createAccessKeyFor: string | null,
}



export class NearWallet {

  walletSelector: WalletSelector;
  wallet: Wallet | null;
  walletConfig: WalletConfig;
  accountId: string | null;

  constructor(walletConfig: WalletConfig,walletSelector: WalletSelector) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.walletConfig = walletConfig;
    this.walletSelector = walletSelector;
    this.wallet = null;
    this.accountId = null;

  }

  public static async WithWalletSelector(walletConfig: WalletConfig): Promise<WalletSelector>{
    return await setupWalletSelector({
      network: walletConfig.network,
      modules: [
        setupNearWallet({iconUrl: NearIconUrl }),
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
    if (this.wallet){
      this.wallet.signOut();
    }

    this.wallet = this.accountId = this.walletConfig.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname); 
  }
}