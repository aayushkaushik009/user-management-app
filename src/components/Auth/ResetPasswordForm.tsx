import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { token } = router.query; // Assuming the token is passed in the query
            const response = await axios.post('/api/password-reset/reset', {
                email,
                password,
                token,
            });

            if (response.status === 200) {
                setSuccess('Password reset successfully. You can now log in.');
                // Optionally redirect to login page
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            }
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPasswordForm;