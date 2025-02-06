import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'your_default_secret_key'; // Ensure you use the same secret for verification

const verifyAccessToken = (token: string) => {
    try {
      // Decode and verify the token
      const decoded = jwt.verify(token, secret);
  
      // If token is valid, decoded will contain the payload
      console.log('Decoded Token:', decoded);
      return decoded; // Return the decoded payload
    } catch (error) {
      // Handle invalid or expired token
      console.error('Token verification failed:', error);
      return null; // Return null if verification fails
    }
  };
  
  // Example usage in an API route (assuming the token is in the Authorization header)
  const exampleRoute = (req:any, res:any) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
  
    const decoded = verifyAccessToken(token);
  
    if (decoded) {
      // Token is valid, proceed with the request
      return res.status(200).json({ message: 'Token is valid', userData: decoded });
    } else {
      // Token is invalid or expired
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }