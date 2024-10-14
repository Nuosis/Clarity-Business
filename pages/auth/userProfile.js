import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    const userID = 'your-user-id'; // Replace with actual user ID
    dispatch(fetchUser(userID));
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default UserProfile;
