import CryptoJS,  { AES  } from 'crypto-js';


export function encryptData(s: string , key:string) :string  {
  try {
    // Combine IV and encrypted data (Base64 encoded)
    const encryptedText = AES.encrypt(s,key).toString()

    return encryptedText;

  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data");
  }
}

export function decryptData(s:  string, key:string) : string {
     
   const decryptedStr = AES.decrypt( s, key ).toString(CryptoJS.enc.Utf8);
    if (!decryptedStr) {
      console.log("Err ",  decryptedStr , "decryptData from in")
  }
    return decryptedStr;
  }


  