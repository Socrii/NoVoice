import {catchAsyncErrors} from "../middlewares/catchAsyncError.js";
import {User} from "../models/userSchema.js";
import { ErrorHandler } from "../middlewares/error.js";
import {jwt} from 'jsonwebtoken'

export const isAuthenticated=catchAsyncErrors((req,res,next)=>
{
    const token=req.cookies.token;
    if(!token) // it will generate only if we are registered or loggedin 
    {
        return next(new ErrorHandler("User is not authenticated"),400);
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user= User.findById(decode.id);
    next();
});

export const isAuthorized=(...roles)=>{
       return (req,res,next)=>
        {
            if(!roles.includes(req.user.role))
            {
                return next(new ErrorHandler(`User with role of (${req.user.role}) is not allowed to access the resoueces!`));
            }
            next();
        };
    };
    
    
