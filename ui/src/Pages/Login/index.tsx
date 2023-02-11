import hero from './login.jpg';
import { LoginForm } from './LoginForm';

export default function Login() {
  return (
    <section className='bg-white'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt='cat high five'
            src={hero}
            className='absolute inset-0 h-full w-full object-cover opacity-80'
          />

          <div className='hidden lg:relative lg:block lg:p-12'>
            <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
              Purrfect Creations 🐱‍🚀
            </h2>

            <p className='mt-4 leading-relaxed text-white/90'>
              Where every cat's purrfect dreams come to life
            </p>
          </div>
        </section>

        <main
          aria-label='Main'
          className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6'
        >
          <div className='w-full lg:w-3/4'>
            <div className='relative  block lg:hidden'>
              <h1 className='mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
                Purrfect Creations 🐱‍🚀
              </h1>

              <p className='mt-4 leading-relaxed text-gray-500'>
                Where every cat's purrfect dreams come to life
              </p>
            </div>

            <LoginForm />
          </div>
        </main>
      </div>
    </section>
  );
}
