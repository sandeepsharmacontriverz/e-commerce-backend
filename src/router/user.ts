import { Router } from "express";
import controllers from "../controllers/auth";

const router = Router();

router.post("/signup", controllers.register);
router.post("/signin", controllers.login);
router.get("/signout", controllers.logout);
router.get("/", controllers.getAllUsers);

// router.post("/forgot-password", controllers.forgotPassword);
// router.post("/reset-password", controllers.resetPassword);

// router.post("/update-password", controllers.updatePassword);


export default router;
