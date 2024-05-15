import mongoose from "mongoose";

(async () => {
  const db = await mongoose.connect("mongodb://localhost:27017/web-suyai", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Database is connected to", db.connection.name);
})();
