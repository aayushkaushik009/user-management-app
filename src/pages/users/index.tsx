import { useEffect, useState } from 'react';
import { User } from '../../types';
import UserList from '../../components/User/UserList';
import { fetchUsers } from '../../utils/api';

const UserIndex = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Management</h1>
      <UserList users={users} />
    </div>
  );
};

export default UserIndex;