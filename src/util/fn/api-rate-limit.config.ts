export const rateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    validate: {
         ip: false,
         trustProxy: false,
         xForwardedForHeader: false
    }
}