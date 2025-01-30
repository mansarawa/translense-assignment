import encryptData from "../helper/encryptData.js";
import { upload } from "../middleware/upload.js";
import Owner from "../models/ownerModel.js";



export const createOwnerController = async (req, res) => {
    try {
    
        upload(req, res, async (err) => {
            if (err) {
                console.log(err)
                const encryptedData = await encryptData(JSON.stringify({ message: err.message, success: false }));
                return res.status(400).json({ data: encryptedData });
            }

            const {businessId, fullName, country, state, city, address, email, mobileNumber, } = req.body;
            console.log(req.body)
            
            if (!businessId || !fullName || !country || !state || !city || !address || !email || !mobileNumber) {
                const encryptedData = await encryptData(JSON.stringify({ message: "All fields are required!", success: false }));
                return res.status(400).json({ data: encryptedData });
            }

           
            const owner = new Owner({
                businessId,
                fullName,
                country,
                state,
                city,
                address,
                email,
                mobileNumber,
                profilePic: req.file ? req.file.path : null 
            });

            await owner.save();

            
            const encryptedData = await encryptData(JSON.stringify({ message: "Owner registered successfully", owner, success: true }));
            res.status(201).json({ data: encryptedData });
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            console.log(errors)
            const encryptedData = await encryptData(JSON.stringify({ message: errors, success: false }));
            return res.status(400).json({ data: encryptedData });
        }
        console.log(error.message)
        const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
        res.status(500).json({ data: encryptedData });
    }
};

export const getAllOwnerController=async(req,res)=>{
    try {
        const allOwner=await Owner.find()
        const encryptedData = await encryptData(JSON.stringify({ message: "Owner Fetched",allOwner, success:true }));
        res.status(500).json({ data: encryptedData });

    } catch (error) {
         const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
         return res.status(500).json({ data: encryptedData });
    }
}

export const getSingleOwnerController=async(req,res)=>{
    const {businessId}=req.params
    try {
        const oneOwner=await Owner.findOne({businessId})
        const encryptedData = await encryptData(JSON.stringify({ message: "Owner Fetched",oneOwner, success:true }));
        res.status(500).json({ data: encryptedData });

    } catch (error) {
         const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
         return res.status(500).json({ data: encryptedData });
    }
}
