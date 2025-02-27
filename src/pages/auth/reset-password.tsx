import { useState } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '../../utils/auth'; // Assuming you have a function to handle password reset

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { token } = router.query; // Get the token from the URL

    interface ResetPasswordProps {
        token: string | string[] | undefined;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await resetPassword(token as string, password); // Call the reset password function
            setSuccess("Password has been reset successfully!");
            setError('');
        } catch (err) {
            setError("Failed to reset password. Please try again.");
            setSuccess('');
        }
    };

    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
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
        </div>
    );
};

export default ResetPassword;