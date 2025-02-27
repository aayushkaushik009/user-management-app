import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }

    // Simulated API call
    setTimeout(() => {
      setMessage({ text: 'Registration successful! Redirecting...', type: 'success' });
      setTimeout(() => router.push('/auth/login'), 3000);
    }, 1500);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Register</h2>
        <p className={styles.authSubtitle}>Create your account</p>

        {message && (
          <p className={`${styles.authMessage} ${message.type === 'error' ? styles.authError : styles.authSuccess}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.inputField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.authButton}>
            Register
          </button>
        </form>

        <a href="/auth/login" className={styles.authLink}>
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};

export default Register;
