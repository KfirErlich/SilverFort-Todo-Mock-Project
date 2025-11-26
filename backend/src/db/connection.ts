import mongoose from 'mongoose';

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("FATAL ERROR: MONGO_URI is not defined.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB Connected Successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err);
        // יציאה בכישלון אם החיבור נכשל
        process.exit(1); 
    }
};