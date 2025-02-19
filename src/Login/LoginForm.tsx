import React, { useState } from 'react';

/* UI */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import FormErrors from './types/FormErrors';

/* Context */
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { login, error: apiError } = useAuth();

  const blurInput = ({ field }: { field: 'name' | 'email' }) => {
    const formErrors: FormErrors = {};
    const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);

    if (field === 'name' && !name.trim()) {
      formErrors[field] = `${capitalizedField} is required`;
    }

    if (field === 'email' && !email.trim()) {
      formErrors[field] = `${capitalizedField} is required`;
    }

    setErrors((prevState) => ({ ...prevState, ...formErrors }));
  };

  const validateForm = (): FormErrors => {
    const formErrors: FormErrors = {};

    if (!name.trim()) {
      formErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
    }
    setErrors(formErrors);
    return formErrors;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      return;
    }

    setLoading(true);

    try {
      await login(name, email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-sm'>
      {apiError && (
        <Alert className='my-3' variant='destructive'>
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={submitForm} name='login'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-start mt-1 w-full min-h-22'>
            <Label htmlFor='name' className='mb-2'>
              Name
            </Label>
            <Input
              className='invalid:border---destructive invalid:ring---destructive'
              id='name'
              type='text'
              value={name}
              onBlur={() => blurInput({ field: 'name' })}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setErrors((prevState) => ({ ...prevState, name: '' }));
                setName(event.currentTarget.value);
              }}
              placeholder='Scooby Doo'
            />
            {errors?.name && (
              <p className='text---destructive font-medium mt-1 text-sm'>
                {errors?.name}
              </p>
            )}
          </div>
          <div className='flex flex-col items-start mt-1 w-full min-h-22'>
            <Label htmlFor='email' className='mb-2'>
              Email
            </Label>
            <Input
              className={
                errors?.email &&
                'invalid:border---destructive invalid:ring---destructive'
              }
              id='email'
              type='email'
              value={email}
              onBlur={() => blurInput({ field: 'email' })}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setErrors((prevState) => ({ ...prevState, email: '' }));
                setEmail(event.currentTarget.value);
              }}
              placeholder='dogluver@gmail.com'
            />
            {errors?.email && (
              <p className='text---destructive font-medium mt-1 text-sm'>
                {errors?.email}
              </p>
            )}
          </div>
          <Button
            variant='default'
            className='mt-3 cursor-pointer focus:outline-2 focus:outline-offset-2 rounded-full px-10'
            type='submit'
            disabled={loading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
