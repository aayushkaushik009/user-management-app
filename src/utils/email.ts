import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', to);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Error sending password reset email');
  }
};
