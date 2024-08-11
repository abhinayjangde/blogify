import mongoose from "mongoose";

const connection = {};
const db = async () => {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }
    try {
        const conn = await mongoose.connect("mongodb+srv://abhinayjangde:9JInOnOHEiNElZnv@cluster0.ynqyd.mongodb.net/complete-blog?retryWrites=true&w=majority&appName=Cluster0", {})
        connection.isConnected = conn.connections[0].readyState;
        console.log("Database connected successfully.");
    } catch (error) {
        console.log("DB Connection error", error);
        process.exit(1);
    }
}

export default db;