import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "./model/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"

export const register=catchAsyncError(async(req,res,next)=>
{
    const {name,email,password,phone,role,education}=req.body;
    if(!name||!email||!password||!phone||!role||!education)
    {
        return next(new ErrorHandler('Please fill full details !!',400))
    }
    // user already exist 
    let user=await User.findOne({email});
    if(user)
    {
        return next(new ErrorHandler("User already exists",400));

    }
   user= await User.create
    (
        {
            name,
            email,
            password,
            phone,
            role,
            education
        }
    );
    sendToken(user,200,"User registered Successfully!!",res);
});

export const login=catchAsyncError(async(req,res,next)=>
{
    const {email,password,role}=req.body;
    if(!email||!password||!role)
        return next(new ErrorHandler("Please fill all the details !!",400));

    const user=await User.findOne({email}).select("+password")
    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password !!",400));

    }
    const isPasswordmatched =await user.comparePassword(password);
    if(!isPasswordmatched)
    {
        return next(new ErrorHandler('Invalid email or password!!!',400));
    }
    if(user.role!==role)
    {
        return next(new ErrorHandler(`User with provided role ${role} not found `,400));
    }    
    sendToken(user,200,"User Loggedin Successfully!!",res);
}); 

export const logout=catchAsyncError((req,res,next)=>
{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true
    }).json({
        success:true,
        message:"User logged out!",
    });
})

export const getMyProfile=catchAsyncError((req,res,next)=>
{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    }); 
});


export const getAllAuthors=catchAsyncError(async (req,res,next)=>
{
    const authors=await User.find({role:"Author"});
    res.status(200).json({
        success:true,
        authors,
    });
});