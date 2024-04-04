import nodemailer from "nodemailer"

export const sendEmail = async({email,emailType, userId}:any) =>{
try {
  //configure mail for usage
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  const mailOptions = await transporter.sendMail({
    from: 'karan@samrat.ai', // sender address
    to: email,
    subject: emailType === 'VERIFY' ? "verify your email" : "reset your password", // Subject line
    html: "<b>Hello world?</b>", // html body
  });

  const mailResponse =  await transporter.sendMail(mailOptions)
  return mailResponse
  
} catch (error:any) {
  throw new Error(error.message)
}
}