import mongoose from "mongoose";

export async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URL!)

    const connection = mongoose.connection
    connection.on('connected', ()=>{
      console.log("mongDB connected")
    })

    connection.on('error', (err)=>{
      console.log("error while connecting to MongoDB" + err)
      process.exit(1)
    })
  } catch (error) {
    console.log("somthing went wroong while connecting to mongodb", error)
  
  }
}













//  here !  is used in line numbedr 5 is for to resolve error you can check it again by removing it and cause it is in typesript thats why we have to use that
