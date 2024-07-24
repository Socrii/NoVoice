import { message } from "statuses";

class  ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;        
        }
}

export const middlewares=(err,req,res,next)=>
{
    err.message=err.message||"Internal Server Error ";
    err.statusCode=err.statusCode||500;// internal server error ka status code 500

    if(err.name==="Cast Error")
    {
        // error atlas ke sath error deta hai but abhi mera mongo compass se connected hai 
        // models ke under title string format me require but numerical format me mil rha tha
        const message=`Invalid Resource not found:${err.path}`;
        err=new ErrorHandler(message,404);
        
    }
    return res.statusCode(err.statusCode).json
    (
        {
            success:false,
            message:err.message,
        }
    );
        

}
export default ErrorHandler;