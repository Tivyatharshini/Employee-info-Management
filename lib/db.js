import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('DB connected successfully');
        
    } catch(err){
        console.log(err);
    }
}
export default connectDB;