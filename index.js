const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/conn");
const app = express();
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
app.use(bodyParser());
const UserModal = require("./src/models/user");
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Hello wordld",
  });
});

app.post("/api/user/register", async (req, res) => {
  try {
    const { email, password, clientName } = req.body;

    if (!email || !password || !clientName) {
      res.status(500).json({
        status: false,
        message: "Cant register , Please check your details",
      });
    } else {
      const newUser = new UserModal(req.body);
      await newUser.save();
      res.status(200).json({
        status: true,
        message: "user registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Cant register , Please check your details",
    });
  }
});

app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).json({
        status: false,
        message: "Please add all fields",
      });
    } else {
      const UserLogin = await UserModal.findOne({
        email,
      });

      if (UserLogin) {
        console.log(UserLogin.password);

        console.log(password);
        bcrypt.compare(password, UserLogin.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            console.log("Password doesn't match!");
            res.status(500).json({
              status: false,
              message: "Cant login, Please check your details",
            });
          } else {
            console.log("Password matches!");
            res.status(200).json({
              status: true,
              message: "Login successful",
              data: UserLogin,
            });
          }
        });
      } else {
        res.status(500).json({
          status: false,
          message: "Cant login, Please check your details",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Cant login",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
