import {
  SAVE_CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  EDITING_EXPENSE,
  EDIT_EXPENSE,
  FORM_FILLED,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  fillForm: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.payload),
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      editor: true,
      fillForm: true,
      idToEdit: action.payload,
    };
  case FORM_FILLED:
    return {
      ...state,
      fillForm: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses
        .map((el) => {
          if (el.id === action.payload.id) {
            return action.payload.editedExpense;
          }
          return el;
        }),
    };
  default:
    return state;
  }
};

export default wallet;
