import { AxiosError } from 'axios';
import { useState } from 'react';
import { useUpdatePassword } from '../../hooks/useAuth';

export function ChangePasswordForm({ done }: { done: () => void }) {
  const updatePassword = useUpdatePassword();
  const [changePasswordError, setChangePasswordError] = useState<
    string | undefined
  >();
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleChangePassword = (password: string, confirmPassword: string) => {
    setChangePasswordError(undefined);
    setShowSuccessMessage(false);
    if (!password || password !== confirmPassword) {
      return setChangePasswordError(
        'Password and Confirm passwords are different'
      );
    }

    updatePassword.mutate(
      {
        password,
      },
      {
        onError(error) {
          let errorMessage;
          if (error instanceof AxiosError) {
            errorMessage = error?.response?.data?.message;
          }
          setChangePasswordError(
            errorMessage || 'Failed to update password. Please try again'
          );
        },
        onSuccess(data) {
          localStorage.setItem('token', data.access_token);
          setShowSuccessMessage(true);
        },
      }
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = e.target as any;
        handleChangePassword(
          formData.password.value,
          formData.confirmPassword.value
        );
      }}
      className='mt-8 grid gap-6'
    >
      {changePasswordError && (
        <div
          role='alert'
          className='col-span-6 rounded border-l-4 border-red-500 bg-red-50 p-4'
        >
          <p className='w-full mt-2 text-sm text-red-700'>
            {changePasswordError}
          </p>
        </div>
      )}
      {showSuccessMessage && (
        <div
          role='alert'
          className='col-span-6 rounded border-l-4 border-green-500 bg-green-50 p-4'
        >
          <p className='w-full mt-2 text-sm text-green-700'>Password Updated</p>
        </div>
      )}

      <div className='col-span-6'>
        <label
          htmlFor='NewPassword'
          className='block text-sm font-medium text-gray-700'
        >
          New Password
        </label>

        <input
          type='password'
          id='NewPassword'
          name='password'
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
        />
      </div>

      <div className='col-span-6'>
        <label
          htmlFor='ConfirmPassword'
          className='block text-sm font-medium text-gray-700'
        >
          Confirm New Password
        </label>

        <input
          type='password'
          id='ConfirmPassword'
          name='confirmPassword'
          className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
        />
      </div>

      <div className='col-span-6 flex justify-center'>
        <button
          type='submit'
          className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
        >
          Change Password
        </button>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => done()}
        >
          Close
        </button>
      </div>
    </form>
  );
}
