const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserModal = new mongoose.Schema({
  clientName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

UserModal.pre("save", function (next) {
  //   console.log(this);
  //   bcrypt.genSalt(saltRounds, function (err, salt) {
  //     bcrypt.hash(this.password, salt, function (err, hash) {
  //       this.name;
  //     });
  //   });

  //   next();

  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model("user", UserModal);
