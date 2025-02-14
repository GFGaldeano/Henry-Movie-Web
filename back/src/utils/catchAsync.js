const catchAsync = (controller) =>{
 return (req, res, next)=>{
  controller(req,res).catch((error)=>next(error));
 };
}

module.exports = catchAsync;