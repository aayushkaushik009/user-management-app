# User Management Application

This is a user management application built with Next.js and NextAuth.js. It provides features for user authentication, tenant management, role-based access control, and password management.

## Features

- **User Authentication**
  - User registration with email verification.
  - Login using email and password.
  - Social authentication (Google, Facebook).
  - User logout functionality.

- **Tenant Management**
  - Create, edit, and delete tenants.
  - Users can belong to one or more tenants.

- **Role-Based Access Control (RBAC)**
  - Define roles (admin, manager, user) with different access levels.
  - Assign roles to users within a tenant.
  - Restrict access based on user roles and permissions.

- **Permission Management (Optional)**
  - Define and manage permissions associated with roles.

- **Password Management**
  - Request password reset link via email.
  - Secure password reset functionality.

## Technologies Used

- **Frontend**: Next.js (version 13+)
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS Modules and global styles

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd user-management-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```
   MONGODB_URI=<your-mongodb-connection-string>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment

To deploy the application, you can use platforms like Vercel or Heroku. Follow the respective documentation for deployment instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Next.js documentation
- NextAuth.js documentation
- Mongoose documentation

Feel free to reach out if you have any questions or need further assistance!