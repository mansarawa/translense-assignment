import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:Number
    }
}, { timestamps: true });

const OTP = mongoose.model("otp", otpSchema);
export default OTP;
