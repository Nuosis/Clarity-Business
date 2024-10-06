import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import AuthLayout from '@/components/layout/AuthLayout';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey] = useState(process.env.NEXT_PUBLIC_APP_TOKEN);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: email, password, apiKey }));
  };

  return (
    <AuthLayout>
      <div className='sm:mb-8 mb-6 text-center'>
        <div className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2'>
          Sign In
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <div className='form-control mb-15'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='name@example.com'
            className='form-input'
            required
          />
        </div>

        <div className='form-control mb-15'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter the password'
              className='form-input !pr-12'
              required
            />
            <button
              onClick={togglePasswordVisibility}
              type='button'
              className='absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100'
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>

        {/* Show error message if login fails */}
        {status === 'failed' && (
          <div className='text-red-500 mb-4'>
            Error: {error || 'Login failed. Please try again.'}
          </div>
        )}

        {/* Show loading indicator while waiting for the login API response */}
        {status === 'loading' ? (
          <button type='button' disabled className='btn btn-secondary large w-full uppercase'>
            Logging in...
          </button>
        ) : (
          <button type='submit' className='btn btn-secondary large w-full uppercase'>
            Sign In
          </button>
        )}
      </form>

      <div className='text-center sm:mt-30 mt-6 text-font-color-100'>
        <p>Don't have an account yet?</p>
        <Link href='/auth/signup' className='text-primary'>
          Sign up here
        </Link>
      </div>
    </AuthLayout>
  );
}
