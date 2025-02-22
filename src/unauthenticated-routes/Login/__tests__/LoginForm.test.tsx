import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosInstance from '../../../api/config';
import { MemoryRouter } from 'react-router';

import LoginForm from '../components/LoginForm';
import { AuthProvider } from '../../../context/AuthContext';
const mockUseNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));

jest.mock('../../api/config');
const mockAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('LoginForm', () => {
  const setup = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders the login form', () => {
    const { getByRole, getByLabelText, queryByText } = setup();

    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();

    expect(getByLabelText('Name')).toHaveValue('');
    expect(getByLabelText('Email')).toHaveValue('');

    expect(queryByText('Name is required')).not.toBeInTheDocument();
    expect(queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('handles name input change', async () => {
    const { getByLabelText } = setup();

    const nameInput = getByLabelText('Name');

    expect(nameInput).toHaveValue('');
    await userEvent.type(nameInput, 'Balto');
    expect(nameInput).toHaveValue('Balto');
  });

  it('handles email input change', async () => {
    const { getByLabelText } = setup();

    const emailInput = getByLabelText('Email');

    expect(emailInput).toHaveValue('');
    await userEvent.type(emailInput, 'balto@balto.com');
    expect(emailInput).toHaveValue('balto@balto.com');
  });

  it('handles blur', async () => {
    const { getByLabelText, getByText, queryByText } = setup();
    expect(queryByText('Name is required')).not.toBeInTheDocument();
    expect(queryByText('Email is required')).not.toBeInTheDocument();

    getByLabelText('Name').focus();
    await userEvent.tab();

    expect(getByText('Name is required')).toBeInTheDocument();

    getByLabelText('Email').focus();
    await userEvent.tab();

    expect(getByText('Email is required')).toBeInTheDocument();
  });

  it('does not submit form if name is empty', async () => {
    const { getByLabelText, getByRole } = setup();

    await userEvent.type(getByLabelText('Email'), 'balto@balto.com');
    await userEvent.click(getByRole('button', { name: 'Login' }));

    await waitFor(() => expect(mockAxios.post).not.toHaveBeenCalled());
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });

  it('does not submit form if email is empty', async () => {
    const { getByText, queryByText, getByLabelText, getByRole } = setup();
    expect(queryByText('Email is required')).not.toBeInTheDocument();

    await userEvent.type(getByLabelText('Name'), 'Balto');
    await userEvent.click(getByRole('button', { name: 'Login' }));

    await waitFor(() => expect(mockAxios.post).not.toHaveBeenCalled());
    expect(getByText('Email is required')).toBeInTheDocument();
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });

  it('handles form submission if there is an api error', async () => {
    (mockAxios.post as jest.Mock).mockRejectedValue(new Error('Error!'));

    const { getByLabelText, getByRole, queryByRole } = setup();

    expect(queryByRole('alert')).not.toBeInTheDocument();

    await userEvent.type(getByLabelText('Name'), 'Balto');
    await userEvent.type(getByLabelText('Email'), 'balto@balto.com');
    await userEvent.click(getByRole('button', { name: 'Login' }));

    await waitFor(() =>
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', {
        name: 'Balto',
        email: 'balto@balto.com',
      })
    );
    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByRole('alert')).toHaveTextContent(
      'There was an error while logging you in. Please try again later.'
    );
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });

  it('handles form submission if name and email are valid', async () => {
    (mockAxios.post as jest.Mock).mockResolvedValue({ status: 200 });

    const { getByLabelText, getByRole } = setup();

    await userEvent.type(getByLabelText('Name'), 'Balto');
    await userEvent.type(getByLabelText('Email'), 'balto@balto.com');
    await userEvent.click(getByRole('button', { name: 'Login' }));

    await waitFor(() =>
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', {
        name: 'Balto',
        email: 'balto@balto.com',
      })
    );
    expect(mockUseNavigate).toHaveBeenCalledWith('/search');
  });
});
