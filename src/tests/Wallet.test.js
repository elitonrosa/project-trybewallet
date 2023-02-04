import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const PASSWORD = '123456';
const EMAIL = 'teste@teste.com';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const VALUE = '40';
const VALUE_INPUT = 'value-input';
// const DESCIPTION = 'Mec Donalds';

describe('Teste página Wallet', () => {
  it('Testa se o email do usuário é exibido no Header da aplicação', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button');

    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(loginBtn);

    const emailField = screen.getByTestId('email-field');
    expect(emailField.innerHTML).toBe(EMAIL);
  });

  it('Testa se o texto "BRL" é exibido no Header da aplicação', () => {
    renderWithRouterAndRedux(<Wallet />);

    const coin = screen.getByTestId('header-currency-field');
    expect(coin.innerHTML).toBe('BRL');
  });

  it('Testa se o total das despesas começa com o "0.00" no Header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalField = screen.getByTestId('total-field');
    expect(totalField.innerHTML).toBe('0.00');
  });

  it('Testa se todos os cammpos para adicionar uma despesa são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(VALUE_INPUT);
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('Testa se uma despesa é adicionada ao clicar no botão "Adicionar despesa"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ ...mockData }),
    });
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.type(valueInput, VALUE);
    userEvent.click(btnAddExpense);
    const totalExpenses = screen.getByTestId('total-field');
    await waitFor(() => expect(totalExpenses.innerHTML).not.toBe('0.00'));
  });

  it('Testa é possível editar uma despesa', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ ...mockData }),
    });
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(VALUE_INPUT);
    const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(valueInput, VALUE);
    userEvent.click(btnAddExpense);

    const editBtn = await waitFor(() => screen.getByRole('button', { name: 'Editar' }));
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    const saveEditBtn = screen.getByRole('button', { name: 'Editar despesa' });
    expect(saveEditBtn).toBeInTheDocument();

    userEvent.type(valueInput, '30');
    userEvent.click(saveEditBtn);

    const excludeBtn = await waitFor(() => screen.getByRole('button', { name: 'Excluir' }));
    expect(excludeBtn).toBeInTheDocument();
    userEvent.click(excludeBtn);
    expect(editBtn).not.toBeInTheDocument();

    userEvent.type(valueInput, VALUE);
    userEvent.click(btnAddExpense);
    userEvent.type(valueInput, VALUE);
    userEvent.click(btnAddExpense);

    const editBtns = await waitFor(() => screen.getAllByRole('button', { name: 'Editar' }));
    userEvent.click(editBtns[1]);
    userEvent.type(valueInput, '30');
    userEvent.click(saveEditBtn);
  });
});
