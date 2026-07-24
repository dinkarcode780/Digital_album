import asyncHandler from "../../utils/asyncHandler.js";
import { compareValue } from "../../utils/hashValue.js";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary, uploadToCloudinary } from "../middleware/multerS3.js";
import userModel from "../../models/userModel.js";

export const adminLogin = asyncHandler(async(req,res)=>{
  
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email or password is missing",
      });
    }

    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await compareValue(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    admin._doc.token = token;

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: admin,
    });

});


export const adminUpdateProfile = asyncHandler(async (req, res) => {

    const { adminId, name, email, phoneNumber,address } = req.body;

    if (!adminId) {
        return res.status(400).json({
            success: false,
            message: "adminId is required",
        });
    }

    const admin = await userModel.findById(adminId);

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found",
        });
    }

    if (req.file) {
        if (admin.publicId) {
            await deleteFromCloudinary(admin.publicId, "image");
        }

        const uploadResult = await uploadToCloudinary(
            req.file.path,
            "adminProfile"
        );

        if (!uploadResult) {
            return res.status(400).json({
                success: false,
                message: "Profile image upload failed",
            });
        }

        admin.profileImage = uploadResult.secure_url;
        admin.publicId = uploadResult.public_id;
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phoneNumber = phoneNumber || admin.phoneNumber;
    admin.address = address || admin.address;

    await admin.save();

    res.status(200).json({
        success: true,
        message: "Admin profile updated successfully",
        data: admin,
    });

});


export const getAdminById = asyncHandler(async(req,res)=>{
    const { adminId } = req.query;

    if (!adminId) {
        return res.status(400).json({
            success: false,
            message: "adminId is required",
        });
    }

    const admin = await userModel.findById(adminId);

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found",
        });
    }


    res.status(200).json({
        success: true,
        message: "Admin fetched successfully",
        data: admin,
    });
})

export const userIsActive = asyncHandler(async (req, res) => {

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "userId is required"
        });
    }

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.status(200).json({
        success: true,
        message: `User ${
            user.isActive ? "activated" : "deactivated"
        } successfully`,
        data: user
    });

});

export const adminLogout = asyncHandler(async(req,res)=>{

     res.clearCookie("authorization");
   
   res.status(200).json({success:true,message:"Admin Log Out successfully"})

});