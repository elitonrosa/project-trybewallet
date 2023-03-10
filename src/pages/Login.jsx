import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { validateEmail, validatePassword } from '../services/validateData';
import { saveUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableBtn: true,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateFields());
  };

  validateFields = () => {
    const { email, password } = this.state;
    if (validateEmail(email) && validatePassword(password)) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUser({ email, disableBtn: true }));
    history.push('/carteira');
  };

  render() {
    const { disableBtn } = this.state;
    return (
      <main>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disableBtn }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ ...state.user });

export default connect(mapStateToProps)(Login);
