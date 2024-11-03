import mongoose from 'mongoose'

const connectionDb = async() =>  {
    try {
        const connect =  await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("db connected to",
         connect.connection.host, 
         connect.connection.name)
    } catch (error) {
          console.log("error connecting to db",error)
    }
}

export default connectionDb