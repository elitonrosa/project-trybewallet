import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions/thunkActions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input
          type="number"
          name="value-input"
          data-testid="value-input"
        />
        <input
          type="text"
          name="description-input"
          data-testid="description-input"
        />
        <select
          name="currency-input"
          data-testid="currency-input"
          defaultValue="USD"

        >
          {
            currencies.map((el, index) => (
              <option key={ index } value={ el }>{el}</option>
            ))
          }
        </select>
        <select
          name="method-input"
          data-testid="method-input"
          defaultValue="dinheiro"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select
          name="tag-input"
          data-testid="tag-input"
          defaultValue="alimentacao"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
