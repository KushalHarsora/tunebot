import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected Successfully");
        });

        connection.on('error', (error) => {
            console.error(`MongoDB connection error. Please make sure MongoDB is running. Error is ${error}`);
            process.exit();
        });

    } catch (error) {
        console.log("Something went wrong!!");
        console.error(error);
    }
}

export default connect;