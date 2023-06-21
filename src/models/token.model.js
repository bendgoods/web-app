const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const { objectId } = require("../validations/custom.validation");
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    key: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      defaultValue: "AUTH",
    },
    loginAt: {
      type: String,
    },
    lastSeenAt: {
      type: String,
    },
    logoutAt: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    blacklistedAt: {
      type: Date,
    },
  },
  {
    modelName: "token",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
    updatedAt: false,
    createdAt: "loginAt",
    deletedAt: "blacklistedAt",
  }
);

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
