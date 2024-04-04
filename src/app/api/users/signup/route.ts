import { connect } from "@/db/dbConfig";
import User from "@/models/userModel"
import {NextRequest , NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()
export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const {username, email, password}  =reqBody
    console.log(reqBody)

    const user = await User.findOne({email})

    if(user){
      return NextResponse.json({error:"User already exists"}
      ,{status:400})
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password:hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    // send verification email start from here--------

    await sendEmail({email , emailType: "VERIFY" , userId: savedUser._id})
    return NextResponse.json({
      message:"user registerd sucessfully",
      success: true,
      savedUser
    })







  } catch (error:any) {
    console.log("error while post request is running")
    return NextResponse.json({error: error.message},
      {status:500})

  }
}