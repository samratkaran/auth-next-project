import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export const sendEmail = async({email,emailType, userId}:any) =>{
try {

  const hashedToken =  await bcrypt.hash(userId.toString(), 10)


  if(emailType === "VERIFY"){
    await User.findByIdAndUpdate(userId, {
      verifyToken:hashedToken,
      verifyTokenExpiry: Date.now() + 3600000
    })
  }else if(emailType === "RESET"){
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken:hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
      
    })

  }



  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba8b48c44ed00e",//this data should no be here
      pass: "********9cbb"//this data should no be here
    }
  });

  const mailOptions = await transport.sendMail({
    from: 'karan@samrat.ai', // sender address
    to: email,
    subject: emailType === 'VERIFY' ? "verify your email" : "reset your password", // Subject line
    html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"} or copy paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
  });

  const mailResponse =  await transport.sendMail(mailOptions)
  return mailResponse
  
} catch (error:any) {
  throw new Error(error.message)
}
}