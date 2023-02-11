import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className='mx-auto  h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </Fragment>
  );
}

export default App;
