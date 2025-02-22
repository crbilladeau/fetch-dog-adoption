/* Components */
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-md'>
        <div className='flex flex-col items-center justify-center'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
