import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const DB =
    "mongodb+srv://tornike:tornike@shopcluster.bqft7gb.mongodb.net/product?retryWrites=true&w=majority";
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      connectTimeoutMS: 300000, // 30 seconds
    })
    .then(() => console.log("DB connnection successful!"));
};
