import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@/store/slices/authSlice'; // Ensure logout action is available
import { useRouter } from 'next/router';

export default function Signout() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Dispatch the logout action to clear auth state
    dispatch(clearAuth());

    // Redirect to the sign-in page after logging out
    router.push('/auth/signin');
  }, [dispatch, router]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p>Signing out...</p>
    </div>
  );
}
