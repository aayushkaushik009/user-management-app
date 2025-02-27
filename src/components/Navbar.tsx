import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* ✅ Branding / Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-400 transition">
          User Management
        </Link>

        {/* ✅ Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* ✅ Navbar Links */}
        <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? "block" : "hidden"} md:block`}>
          {session ? (
            <>
              <Link href="/profile" className="hover:text-gray-300 transition">
                Profile
              </Link>

              {session.user.role === "admin" && (
                <Link href="/tenants/create" className="hover:text-gray-300 transition">
                  Create Tenant
                </Link>
              )}

              {session.user.role === "manager" && (
                <Link href="/users" className="hover:text-gray-300 transition">
                  Manage Users
                </Link>
              )}

              <button
                onClick={() => signOut()}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
