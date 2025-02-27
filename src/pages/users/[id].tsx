import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserDetails from '../../components/User/UserDetails';
import { User } from '../../types';

const UserDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}`);
                    setUser(response.data);
                } catch (err) {
                    setError('Failed to fetch user details');
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div>
            <h1>User Details</h1>
            <UserDetails user={user} />
        </div>
    );
};

export default UserDetailsPage;