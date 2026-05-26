import CryptoJS from 'crypto-js';

const FRONTEND_SECRET = 'frontend_level1_key';

// Encrypt each string field inside an object individually
export const encryptPayloadLevel1 = (data: Record<string, string>) => {
  const encryptedObj: Record<string, string> = {};
  
  for (const key in data) {
    encryptedObj[key] = CryptoJS.AES.encrypt(data[key]!, FRONTEND_SECRET).toString();
  }
  
  // Generate a standard hash of the raw email to allow backend uniqueness checks
  encryptedObj['emailHash'] = CryptoJS.SHA256(data['email']!.toLowerCase()).toString();
  
  return encryptedObj;
};

// Decrypt a single value
export const decryptValueLevel1 = (ciphertext: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, FRONTEND_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return 'Decryption Error';
  }
};
// import CryptoJS from 'crypto-js';
// const FRONTEND_SECRET = 'frontend_level1_key';

// export const encryptLevel1 = (data: object): string => {
//   return CryptoJS.AES.encrypt(JSON.stringify(data), FRONTEND_SECRET).toString();
// };

// export const decryptLevel1 = (ciphertext: string): any => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, FRONTEND_SECRET);
//     const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(decryptedText);
//   } catch (error) {
//     console.error('Decryption failed:', error);
//     return null;
//   }
// };