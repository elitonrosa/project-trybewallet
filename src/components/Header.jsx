import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { totalExpenses } from '../services/calculators';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <p data-testid="email-field">{ email === '' ? 'Usuário não logado' : email }</p>
        <p data-testid="total-field">
          { totalExpenses(expenses).toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user, ...state.wallet,
});

export default connect(mapStateToProps)(Header);
