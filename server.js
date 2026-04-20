const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.send("Node + Mongo running in Docker");
});

app.post("/add", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.send("User added");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, () => console.log("Server running"));