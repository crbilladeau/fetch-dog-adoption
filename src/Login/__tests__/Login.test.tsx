import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import Login from '../Login';

describe('Login', () => {
  it('renders the login form', () => {
    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});
