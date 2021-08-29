import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import crypto from 'crypto';

const secretKey = process.env.SECRET_KEY as string;
const iv = process.env.IV as string;

export const encrypt = (value: string) => {
    const encrypter = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encryptedMessage = encrypter.update(value, 'utf8', 'hex');
    
    return encryptedMessage += encrypter.final('hex');
}

export const decrypt = (value: string) => {
    const decrypter = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decryptedMessage = decrypter.update(value, 'hex', 'utf8');

    return decryptedMessage += decrypter.final('utf8');
}