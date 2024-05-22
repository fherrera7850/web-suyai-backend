import { Router } from "express";
import {
  signinController,
  signupController,
  getProfile,
  logoutController,
} from "../controllers/authController";
import { verifyToken } from "../libs/verifyToken";

const router = Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

router.post("/logout", logoutController);

export default router;
