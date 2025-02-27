import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link href="/">User Management App</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/tenants">Tenants</Link>
                        </li>
                        <li>
                            <Link href="/users">Users</Link>
                        </li>
                        {session ? (
                            <>
                                <li>
                                    <button onClick={() => signOut()} className="text-gray-300 hover:text-white">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/auth/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/auth/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;