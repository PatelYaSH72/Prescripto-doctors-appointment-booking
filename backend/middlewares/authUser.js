import jwt from 'jsonwebtoken'

// admin authentication middleware
const authUser = async (req,res,next) => {
  try {
    
    const {token} = req.headers
    if (!token) {
      return res.json({success:false,message:'Not Authorized Login Again'})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    console.log(token_decode)

    // sign ke vakt jo user data ke sath Id save karai thi, and token me user ki Id save karai to ab vahi Id nikal ke body me save kara rahe he
    //taki abhi body me id vo or database me user data me jo ID vo match karai
    req.userId = token_decode.id
     console.log()

    next()

  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }
}

export default authUser