const express = require("express");
const app = express();
const cors = require("cors");
const uploadRouter = require("./routes/uploadRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable("x-powered-by");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/encode", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:3000`);
});
