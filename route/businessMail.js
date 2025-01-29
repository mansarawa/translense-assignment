import express from 'express';
import otpMail from '../mail/otp.js';

import OTP from '../models/otpModel.js';
import encryptData from '../helper/encryptData.js';

const sendotp = express.Router();


let check;

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}


sendotp.post('/send-otp', async (req, res) => {
  const otp = generateOTP();
  console.log(req.body)
  check = otp;
  try {    
    const {email} = req.body; 
    
    const findOtp = await OTP.find({email});
    if (findOtp.length > 0) {

      await OTP.findOneAndDelete({email})
    }

    const addOtp = await new OTP({email,otp});
    if (addOtp) {
      await otpMail(email, otp);
      console.log(`Sending OTP ${otp} to ${email}`);
      const encryptedResponse = encryptData({ success: true, message: 'OTP sent successfully!' });
      return res.json({ data: encryptedResponse });
    }

  } catch (error) {
    console.log(error.message);
    const encryptedResponse = encryptData({ success: false, message: 'Failed to send OTP' });
    return res.status(500).json({ data: encryptedResponse });
  }
});




export { sendotp };