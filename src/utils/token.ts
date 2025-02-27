import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object, expiresIn: number | string = '1h'): string => {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] }; // ✅ Explicit cast
    return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string): object | null => {
    try {
        return jwt.verify(token, secretKey) as object;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export const decodeToken = (token: string): object | null => {
    try {
        return jwt.decode(token) as object | null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const generateResetToken = (userId: string, expiresIn: number | string = '1h'): string => {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] }; // ✅ Explicit cast
    return jwt.sign({ userId }, secret, options);
};
