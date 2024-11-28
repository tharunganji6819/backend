const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/index");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://tharun:tharun@tharun.qtg8wns.mongodb.net/backend?retryWrites=true&w=majority&appName=Tharun"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use("/backend", authRoutes);

app.listen(3050, () => {
  console.log("Server Started");
});
