//  for asynchronous error which we did not handle
export const catchAsyncErrors=(theFunction)=>
{
    return(req,res,next)=>
    {
        Promise.resolve(theFunction(req,res,next))
        .catch(next)
    };
};