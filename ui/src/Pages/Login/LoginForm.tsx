import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuth';

export function LoginForm() {
  const login = useLogin();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | undefined>();

  const handleLogin = (username: string, password: string) => {
    login.mutate(
      {
        username,
        password,
      },
      {
        onError(error) {
          let errorMessage;
          if (error instanceof AxiosError) {
            errorMessage = error?.response?.data?.message;
          }
          setLoginError(errorMessage || 'Failed to login. Please try again');
        },
        onSuccess(data) {
          localStorage.setItem('token', data.access_token);
          navigate('/');
        },
      }
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = e.target as any;
        handleLogin(formData.username.value, formData.password.value);
      }}
      className='mt-8 grid gap-6'
    >
      {loginError && (
        <div
          role='alert'
          className='col-span-6 rounded border-l-4 border-red-500 bg-red-50 p-4'
        >
          <p className='w-full mt-2 text-sm text-red-700'>{loginError}</p>
        </div>
      )}

      <div className='col-span-6'>
        <label
          htmlFor='Username'
          className='block text-sm font-medium text-gray-700'
        >
          Username
        </label>

        <input
          type='text'
          id='Username'
          name='username'
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
        />
      </div>

      <div className='col-span-6'>
        <label
          htmlFor='Password'
          className='block text-sm font-medium text-gray-700'
        >
          Password
        </label>

        <input
          type='password'
          id='Password'
          name='password'
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
        />
      </div>

      <div className='col-span-6 flex justify-center'>
        <button className=' w-1/2 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
          Log in
        </button>
      </div>
    </form>
  );
}
