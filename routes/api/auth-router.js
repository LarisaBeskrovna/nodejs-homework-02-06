const express = require("express");
const {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} = require("../../utils/userValidation");
const authController = require("../../controllers/auth-controller");
const validateBody = require("../../decorators/validateBody");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const authRouter = express.Router();

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userEmailValidate = validateBody(userEmailSchema);

authRouter.post("/users/register", userSignupValidate, authController.signup);
authRouter.get("/verify/:verificationCode", authController.verify);
authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);
authRouter.post("/users/login", userSigninValidate, authController.signin);
authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/users/signout", authenticate, authController.signout);
authRouter.patch("/users", authenticate, authController.refresh);
authRouter.patch(
  "/users/avatars",
  upload.single("avatar"),
  authenticate,
  authController.avatars
);

module.exports = authRouter;
