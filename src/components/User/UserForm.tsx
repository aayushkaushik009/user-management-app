import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUser, updateUser } from '../../utils/api'; // Assume these functions are defined in utils/api.ts

import { User } from '../../types';

interface UserFormProps {
  user?: User; // Optional user prop for editing
  onSuccess: () => void; // Callback for successful submission
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
  const { register, handleSubmit, setValue } = useForm<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Populate form with user data if editing
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('role', user.role);
    }
  }, [user, setValue]);

  const onSubmit = async (data: User) => {
    setIsLoading(true);
    try {
      if (user) {
        await updateUser(user._id, data); // Update existing user
      } else {
        await createUser(data); // Create new user
      }
      onSuccess(); // Call success callback
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: true })} />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role', { required: true })}>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default UserForm;
