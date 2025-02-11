
import CryptoJS from 'crypto-js'

export const  cipherString = ( s:string,secret:string  ) : string=>{ 
    if(!secret){
        throw new Error( "sry - cipherString  needs its SECRET shh... "  )
    }
     const  ciphertext = CryptoJS.AES.encrypt(s, secret).toString();
     return ciphertext
}
export const unCipherString  = ( s:string , secret:string )=>{
    if(!secret){
        throw new Error( "sry - unCipherString  needs its SECRET shh... "  )
    }
    const  bytes  = CryptoJS.AES.decrypt(s, secret);
    const  originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}
