import mongoose from "mongoose";
const connectDatabase = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database connected : ${con.connection.host}`))
    .catch((err) => console.log(err));
export default connectDatabase;
