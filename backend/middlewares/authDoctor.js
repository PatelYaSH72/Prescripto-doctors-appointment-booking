import jwt from 'jsonwebtoken'

// admin authentication middleware
const authDoctor = async (req,res,next) => {
  try {
    
    const {dtoken} = req.headers
   
    if (!dtoken) {
      return res.json({success:false,message:'Not Authorized Login Again'})
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

    
    // sign ke vakt jo user data ke sath Id save karai thi, and token me user ki Id save karai to ab vahi Id nikal ke body me save kara rahe he
    //taki abhi body me id vo or database me user data me jo ID vo match karai
    req.docId = token_decode.id
    
    
    next()

  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }
}

export default authDoctor