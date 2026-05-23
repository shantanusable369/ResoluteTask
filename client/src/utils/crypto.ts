import CryptoJS from 'crypto-js';
const FRONTEND_SECRET = 'frontend_level1_key';

export const encryptLevel1 = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), FRONTEND_SECRET).toString();
};

export const decryptLevel1 = (ciphertext: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, FRONTEND_SECRET);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};