// import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import styles from '../styles/Home.module.css';

// const Home = () => {
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session) {
//       console.log('User is logged in:', session.user);
//     } else {
//       console.log('User is not logged in');
//     }
//   }, [session]);

//   return (
//     <div className={styles.container}>
//       <h1>Welcome to the User Management Application</h1>
//       <p>
//         This application allows you to manage users and tenants efficiently.
//       </p>
//       <div className={styles.links}>
//         {!session ? (
//           <>
//             <Link href="/auth/login">Login</Link>
//             <Link href="/auth/register">Register</Link>
//           </>
//         ) : (
//           <Link href="/tenants">View Tenants</Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: FC = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the User Management Application</h1>
      <p className={styles.description}>
        This application allows you to manage users and tenants efficiently.
      </p>

      <nav className={styles.nav}>
        {!session ? (
          <div className={styles.authLinks}>
            <Link href="/auth/login" className={styles.button}>Login</Link>
            <Link href="/auth/register" className={styles.button}>Register</Link>
          </div>
        ) : (
          <Link href="/tenants" className={styles.button}>View Tenants</Link>
        )}
      </nav>
    </div>
  );
};

export default Home;
