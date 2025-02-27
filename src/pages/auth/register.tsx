import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Auth.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // ✅ Default role
    tenant: "", // ✅ Default tenant
  });

  const [tenants, setTenants] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Fetch tenants
    const fetchTenants = async () => {
      try {
        const res = await fetch("/api/tenants");
        const data = await res.json();
        console.log("Fetched Tenants:", data); // ✅ Debug log
        if (Array.isArray(data)) {
          setTenants(data);
        } else {
          setTenants([]);
          setError("Invalid response format.");
        }
      } catch (error) {
        console.error("Failed to fetch tenants:", error);
        setError("Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchTenants();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { name, email, password, confirmPassword, role, tenant } = formData;

    if (!name || !email || !password || !confirmPassword || !tenant) {
      setMessage({ text: "All fields are required, including tenant selection.", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, tenant }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage({ text: "Registration successful! Redirecting...", type: "success" });
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (error: any) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Register</h2>
        <p className={styles.authSubtitle}>Create your account</p>

        {message && (
          <p className={`${styles.authMessage} ${message.type === "error" ? styles.authError : styles.authSuccess}`}>
            {message.text}
          </p>
        )}
        {error && <p className={styles.authError}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" className={styles.inputField} value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className={styles.inputField} value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className={styles.inputField} value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className={styles.inputField} value={formData.confirmPassword} onChange={handleChange} required />

          {/* ✅ Tenant Selection */}
          {loading ? (
            <p>Loading tenants...</p>
          ) : (
            <select name="tenant" className={styles.inputField} value={formData.tenant} onChange={handleChange} required>
              <option value="">Select Tenant</option>
              {tenants.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          )}

          {/* ✅ Role Selection */}
          <select name="role" className={styles.inputField} value={formData.role} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

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
