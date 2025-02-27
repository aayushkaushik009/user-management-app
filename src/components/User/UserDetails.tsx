import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserDetails.module.css';

const UserDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}`);
                    setUser(response.data);
                } catch (err) {
                    setError('Failed to fetch user details');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserDetails();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.userDetails}>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Tenants:</strong> {user.tenants.join(', ')}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default UserDetails;