const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/images/default-profile-picture.png",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, { timestamps: true });

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hash = createHmac("sha256", salt).update(user.password).digest("hex");
  user.salt = salt;
  user.password = hash;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const salt = user.salt;
  const hash = createHmac("sha256", salt).update(password).digest("hex");
  if (hash !== user.password) {
    throw new Error("Invalid password");
  }
  return { ...user, password: undefined, salt: undefined };
});

const User = model("user", userSchema);

module.exports = User;