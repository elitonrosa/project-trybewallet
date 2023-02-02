import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <nav>
          <WalletForm />
        </nav>
      </>
    );
  }
}

export default Wallet;
