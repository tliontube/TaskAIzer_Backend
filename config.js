import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
    mongodbURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 5000,
};

export default config;