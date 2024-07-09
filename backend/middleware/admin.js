const admin = async(req,res,next)=>{
    console.log(req.user)
    if(req.user && req.user.role === 'admin'){
        next()
        }else{
            res.status(403).json({message:"You are not Admin" })
            }
}
module.exports = admin;