import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_SECRET = process.env.SERVER_SECRET_KEY || 'default_server_key';

// Level 2 Encryption: Encrypts the already-encrypted string from frontend
export const encryptLevel2 = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SERVER_SECRET).toString();
};

// Level 2 Decryption: Decrypts database string back to Level 1 state
export const decryptLevel2 = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SERVER_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};