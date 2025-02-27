import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        tenantId: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/users/create', formData);
            setSuccess('User created successfully!');
            setTimeout(() => {
                router.push('/users');
            }, 2000);
        } catch (err) {
            setError('Failed to create user. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tenant ID:</label>
                    <input
                        type="text"
                        name="tenantId"
                        value={formData.tenantId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;