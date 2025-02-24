import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/* Components */
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen pb-20'>
      <div className='w-full max-w-md'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-65 h-full'>
            <DotLottieReact
              src='https://lottie.host/eb8e33f4-159e-4974-aaa9-33a513f9b01d/0l9Od3bDfE.lottie'
              loop
              autoplay
            />
          </div>
          <h1 className='text-6xl font-extrabold text-center mb-14'>
            Pupfinder
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
