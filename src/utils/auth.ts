// import { getServerSession } from "next-auth/next";
// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import authOptions from "@/pages/api/auth/[...nextauth]";
// import User, { Role } from "@/models/User"; // ✅ Ensure Role type is imported
// import { connectToDatabase } from "@/utils/db";
// import { Session } from "next-auth";

// // ✅ Define Role Type to Match MongoDB Storage
// type RoleType = "admin" | "manager" | "user";

// /**
//  * ✅ Sends a password reset email with a secure token.
//  * @param email User's email address
//  */
// export const sendPasswordResetEmail = async (email: string): Promise<void> => {
//   await connectToDatabase();

//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User with this email does not exist.");

//   // Generate a secure random token
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   user.resetPasswordToken = resetToken;
//   user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
//   await user.save();

//   const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: Number(process.env.EMAIL_PORT),
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Password Reset Request",
//     text: `Click the following link to reset your password: ${resetLink}`,
//     html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//   };

//   await transporter.sendMail(mailOptions);
// };

// /**
//  * ✅ Checks if the user is authenticated & returns session details.
//  * @param req Next.js API Request
//  * @param res Next.js API Response
//  * @returns User session with role & tenant
//  */
// export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
//     const session: Session | null = await getServerSession(req, res, authOptions);

//     if (!session || !session.user) {
//         res.status(401).json({ message: "Unauthorized" });
//         return null;
//     }

//     return session.user; // ✅ Now TypeScript recognizes session.user
// };

// /**
//  * ✅ Middleware for Role-Based Access Control (RBAC).
//  * @param allowedRoles Array of roles allowed to access the route
//  */

// export const authorizeRoles = (allowedRoles: string[]) => {
//     return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
//         const session = await isAuthenticated(req, res);
//         if (!session) return;
//         if (!allowedRoles.includes(session.role)) {
//             return res.status(403).json({ message: "Access denied" });
//         }
//         next();
//     };
// };

// /**
//  * ✅ Resets the user password using a secure token.
//  * @param token Reset token
//  * @param newPassword New password to set
//  */
// export const resetPassword = async (token: string, newPassword: string) => {
//   await connectToDatabase();

//   const user = await User.findOne({
//     resetPasswordToken: token,
//     resetPasswordExpires: { $gt: new Date() }, // Ensure token is valid
//   });

//   if (!user) throw new Error("Invalid or expired reset token.");

//   // Hash the new password securely
//   user.password = await bcrypt.hash(newPassword, 10);

//   // Clear reset token fields
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;

//   await user.save();
// };

// /**
//  * ✅ Registers a new user securely with role & tenant association.
//  * @param email User email
//  * @param password User password
//  * @param role User role (defaults to "user")
//  * @param tenantId Tenant ID user belongs to
//  * @returns Created user object
//  */
// export const registerUser = async ({
//   email,
//   password,
//   role = "user",
//   tenantId,
// }: {
//   email: string;
//   password: string;
//   role?: RoleType;
//   tenantId: string;
// }) => {
//   await connectToDatabase();

//   // Check if email already exists
//   if (await User.findOne({ email })) throw new Error("Email already registered.");

//   // Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     email,
//     password: hashedPassword,
//     role, // ✅ Assign role
//     tenant: tenantId, // ✅ Associate user with tenant
//   });

//   await newUser.save();
//   return newUser;
// };


import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import authOptions from "@/pages/api/auth/[...nextauth]";
import User, { Role } from "@/models/User"; // ✅ Ensure Role type is imported
import { connectToDatabase } from "@/utils/db";
import { Session } from "next-auth";

// ✅ Define Role Type to Match MongoDB Storage
type RoleType = "admin" | "manager" | "user";

/**
 * ✅ Checks if the user is authenticated & returns session details.
 * @param req Next.js API Request
 * @param res Next.js API Response
 * @returns User session with role & tenant
 */
export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session | null = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        res.status(401).json({ message: "Unauthorized" });
        return null;
    }

    return session.user; // ✅ Now TypeScript recognizes session.user
};

/**
 * ✅ Middleware for Role-Based Access Control (RBAC).
 * @param allowedRoles Array of roles allowed to access the route
 */
export const authorizeRoles = (allowedRoles: string[]) => {
    return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
        const session = await isAuthenticated(req, res);
        if (!session) return;

        if (!allowedRoles.includes(session.role)) {
            return res.status(403).json({ message: "Access denied: insufficient role" });
        }

        next();
    };
};

/**
 * ✅ Middleware to ensure user belongs to the requested tenant.
 * @param tenantId Tenant ID from request params
 */
export const checkTenantAccess = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const session = await isAuthenticated(req, res);
    if (!session) return;

    if (session.role !== "admin" && session.tenant !== req.query.tenantId) {
        return res.status(403).json({ message: "Access denied: You do not belong to this tenant" });
    }

    next();
};

/**
 * ✅ Registers a new user securely with role & tenant association.
 * @param email User email
 * @param password User password
 * @param role User role (defaults to "user")
 * @param tenantId Tenant ID user belongs to
 * @returns Created user object
 */
export const registerUser = async ({
  email,
  password,
  role = "user",
  tenantId,
}: {
  email: string;
  password: string;
  role?: RoleType;
  tenantId: string;
}) => {
  await connectToDatabase();

  // Check if email already exists
  if (await User.findOne({ email })) throw new Error("Email already registered.");

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    role, // ✅ Assign role
    tenant: tenantId, // ✅ Associate user with tenant
  });

  await newUser.save();
  return newUser;
};

