import bcrypt from 'bcryptjs';

 
 export const hashString = async (s:string) => {
    const saltRounds =parseInt( `${process.env.HASH_SLAT_ROUNDS}`)
     // Generates a unique salt based on the specified saltRounds.
     //When bcrypt.compare(credential.password) is called:
     //bcrypt extracts the salt from the stored hash.
    const hashedPassword =  bcrypt.hashSync(s, saltRounds);
    return hashedPassword;
  };