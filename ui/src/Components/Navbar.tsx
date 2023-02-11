import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useAuth';
import { ChangePasswordForm } from '../Pages/Login/ChangePasswordForm';
import { Modal } from './Modal';
import Logo from '/cat-paw.svg';

export function Navbar() {
  const logout = useLogout();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <header aria-label='Site Header' className='bg-white'>
      <div className='mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-8 p-4 sm:px-6 lg:px-8'>
        <Link to={'/'}>
          <a className='block text-teal-600 flex items-center justify-center'>
            <img className='inline' src={Logo} alt='Logo' />{' '}
            <span className='text-3xl font-semibold'>Purrfect Creations</span>
          </a>
        </Link>

        <div className='flex space-x-2'>
          {modalVisible && (
            <Modal title='Change Password'>
              <ChangePasswordForm done={() => setModalVisible(false)} />
            </Modal>
          )}
          <button
            className='rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block'
            onClick={() => setModalVisible(true)}
          >
            Change Password
          </button>
          <button
            className='block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700'
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
