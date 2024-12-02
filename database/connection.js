// connection.js
import mongoose from 'mongoose';
import config from '../config.js'; // Update the path as needed

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;