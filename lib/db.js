import mongoose from "mongoose";
process.loadEnvFile();
const connection = {};
const db = async () => {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {})
        connection.isConnected = conn.connections[0].readyState;
        console.log("Database connected successfully.");
    } catch (error) {
        console.log("DB Connection error", error);
        process.exit(1);
    }
}

export default db;