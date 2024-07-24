import mongoose from "mongoose";


const blogSchema=new mongoose.Schema({

    title:
    {
        type:String,
        required:true,
        minLength:[5,"Blog title must contain 5 character"],
        maxLength:[50,"Blog title atmax contain 50 character"],
    },
    mainImage:
    {
        public_id :
        {
            type:String,
            required:true,
        },
        url:
        {
            type:String,
            required:true,
        }
    },

    intro:
    {
        type:String,
        required:true,
        minLength:[200,"Blog intro must contain 5 character"],
    },

    paraOneImage:
    {
        publicId:
        {
            type:String,
        },
        url:
        {
            type:String,
        }
    },
    paraOneDescription:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },
    paraOneTitle:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },

    //
    paraTwoImage:
    {
        publicId:
        {
            type:String,
        },
        url:
        {
            type:String,
        }
    },
    paraTwoDescription:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },
    paraTwoTitle:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },


    //
    paraThreeImage:
    {
        publicId:
        {
            type:String,
        },
        url:
        {
            type:String,
        }
    },
    paraThreeDescription:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },
    paraThreeTitle:
    { 
        type:String,
        minLength:[50,"Blog title must contain 5 character"],

    },

    category:
    {
        type:String,
        required:true,
    },
    createdBy:
    {
        type:mongoose.Schema.ObjectId,
        ref:"User",// User wale model se 
        required:true,
    },
    authorName:
    {
        type:String,
        required:true,
    },
    authorAvatar:
    {
        type:String,
        required:true,
    },

});
export const Blog=mongoose.model("Blog",blogSchema);