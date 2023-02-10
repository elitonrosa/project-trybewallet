import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editiExpense, formFilled } from '../redux/actions';
import { getCurrencies, getCurrenciesWithRates } from '../redux/actions/thunkActions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  componentDidUpdate() {
    const { fillForm } = this.props;
    if (fillForm) { this.fillTheForm(); }
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  saveExpense = () => {
    const { dispatch } = this.props;
    dispatch(getCurrenciesWithRates({ ...this.state }));
    this.setState({
      value: '',
      description: '',
    });
  };

  editExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const expense = expenses.find((el) => el.id === id);
    const editedExpense = {
      ...expense,
      ...this.state,
    };
    dispatch(editiExpense({ id, editedExpense }));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  fillTheForm = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const expense = expenses.find((el) => el.id === idToEdit);
    const { value, currency, method, tag, description } = expense;
    this.setState({
      value,
      currency,
      method,
      tag,
      description,
    }, () => dispatch(formFilled()));
  };

  render() {
    const { currencies, editor, idToEdit } = this.props;
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
              <option key={ index } value={ el } data-testid="options-await">{el}</option>
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
        {
          editor ? (
            <button
              type="button"
              onClick={ () => this.editExpense(idToEdit) }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ () => this.saveExpense() }
            >
              Adicionar despesa
            </button>
          )
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  fillForm: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
