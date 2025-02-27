# 🛠️ User Management Application

A full-stack User Management System built with **Next.js** and **NextAuth.js**, featuring multi-tenant support, role-based access control, and secure authentication.

## 🚀 Features

### 🔐 Authentication
- User registration with email verification.
- Login using email & password or **Google Authentication**.
- Secure password reset via email.
- Session-based authentication with JWT tokens.

### 🏢 Tenant Management
- Create, update, and delete tenants.
- Users can belong to multiple tenants.

### 🎭 Role-Based Access Control (RBAC)
- Define roles: **Admin, Manager, User**.
- Assign different permissions per role.

### 🔑 Password Management
- Request a password reset link.
- Secure password hashing.

---

## 🏗️ Tech Stack

| **Technology**      | **Purpose**                         |
|---------------------|------------------------------------|
| **Next.js**        | Full-stack React framework        |
| **NextAuth.js**    | Authentication & session handling |
| **MongoDB + Mongoose** | Database & ORM                 |
| **Tailwind CSS**   | Styling framework                 |
| **Clerk (Optional)** | Authentication provider          |


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
