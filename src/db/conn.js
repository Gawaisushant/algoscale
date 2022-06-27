const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then((res) => console.log("mongodb connected"))
  .catch((err) => console.log("err"));
