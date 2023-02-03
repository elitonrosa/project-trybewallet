import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies, getCurrenciesWithRates } from '../redux/actions/thunkActions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(getCurrenciesWithRates({ ...this.state }));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <form>
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
          value={ description }

        />
        <select
          name="currency"
          data-testid="currency-input"
          defaultValue="USD"
          onChange={ this.handleChange }
        >
          {
            currencies.map((el, index) => (
              <option key={ index } value={ el }>{el}</option>
            ))
          }
        </select>
        <select
          name="method"
          data-testid="method-input"
          defaultValue="dinheiro"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          defaultValue="alimentação"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
