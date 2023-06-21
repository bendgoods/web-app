const catchAsync = require('../utils/catchAsync');
const { httpStatus, message } = require('../utils/constant');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../utils/enum');
const { User } = require('../models/user.model');
const { authService, userService, tokenService } = require('../services');
const { getIP, getAgent } = require('../utils/userOriginUtil');

const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user.id, {
  //   ip: getIP(req), const user = await authService.registerUser(req.body);
  //   userAgent: getAgent(req),
  // });
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, {
      user: user,
      tokens: tokens,
    }),
  );
});

const login = catchAsync(async (req, res) => {

  const user = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password,
  );
  const userId = user._id.toString();
  const tokens = await tokenService.generateAuthTokens(user._id, {
    ip: getIP(req),
    userAgent: getAgent(req),
  });

  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, {
      user: user,
      tokens: tokens,
    }),
  );
});

const logout = catchAsync(async (req, res) => {
  const tokens = await tokenService.deleteTokens(req.body.userId);
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { token: tokens }));
});

const profile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  const loginDevices = await tokenService.queryTokens(
    { userId: user.id, type: tokenTypes.ACCESS },
    null,
  );
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, {
      user: user,
      devices: loginDevices,
    }),
  );
});

const changePassword = catchAsync(async (req, res) => {
  const user = await authService.changeUserPassword(
    req.user.id,
    req.body.password,
    req.body.newPassword,
  );
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { user: user }));
});

const loginDevices = catchAsync(async (req, res) => {
  const loginDevices = await tokenService.queryTokens(
    { userId: req.user.id, type: tokenTypes.ACCESS },
    null,
  );
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, { devices: loginDevices }),
  );
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const token = await tokenService.generateAccessToken(req.body.authToken);
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { token: token }));
});

const forgotPassword = catchAsync(async (req, res) => {
  const user = await userService.gatUserByUsernameOrEmail(req.body.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const { token, key } = await tokenService.generateResetToken(user.id, {
    ip: getIP(req),
    userAgent: getAgent(req),
  });
  await emailService.sendResetPasswordEmail(
    user.firstName,
    user.email,
    key,
    token.token,
  );
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { token: token }));
});

const resetPassword = catchAsync(async (req, res) => {
  const token = await tokenService.validateToken(
    req.body.resetToken,
    req.body.resetKey,
  );
  let user = await authService.resetUserPassword(
    token.userId,
    req.body.password,
  );
  await tokenService.expireToken(req.body.resetToken);
  if (req.body.logout) {
    await tokenService.deleteTokens(token.userId, tokenTypes.AUTH, []);
  }
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { user: user }));
});

module.exports = {
  register,
  login,
  logout,
  profile,
  changePassword,
  loginDevices,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
};
