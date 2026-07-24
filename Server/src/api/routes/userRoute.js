import express from "express";
import { getUserByFilter, getUserById, toggleUserStatus, userDeleteById, userForgetPassword, userLogin, userLogout, userRegister, userResetPassword, userUpdateProfile } from "../controllers/userController.js";
import { upload } from "../middleware/multerS3.js";
import { isUser } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/users/userRegister",userRegister);

router.post("/users/userLogin",userLogin);

router.put("/users/userUpdateProfile",isUser,upload.single("profileImage"),userUpdateProfile);

router.get("/users/getUserById",isUser,getUserById);

router.post("/users/getUserByFilter",isUser,getUserByFilter);

router.get("/users/userDeleteById",isUser,userDeleteById);

router.post("/users/userForgetPassword",userForgetPassword);

router.post("/users/userResetPassword",userResetPassword);

router.get("/users/userLogout",isUser,userLogout);


router.get("/users/toggleUserStatus",isUser,toggleUserStatus)


export default router;