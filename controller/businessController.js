import encryptData from "../helper/encryptData.js";
import Business from "../models/businessModel.js";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/business/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

 const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    
}).single("image"); 


export const createBusinessController = async (req, res) => {
    console.log(req.body)
    try {
        
        upload(req, res, async (err) => {
            if (err) {
                const encryptedData = await encryptData(JSON.stringify({ message: err.message, success: false }));
                console.log(err)
                return res.status(400).json({ data: encryptedData });
            }

            const { businessName, country, state, city, address, email, mobileNumber,openingTime,closingTime } = req.body;

           
            if (!businessName || !country || !state || !city || !address || !email || !mobileNumber || !openingTime || !closingTime) {
                const encryptedData = await encryptData(JSON.stringify({ message: "All fields are required!", success: false }));
                return res.status(400).json({ data: encryptedData });
            }

            const business = new Business({
                businessName,
                country,
                state,
                city,
                address,
                email,
                mobileNumber,
                openingTime,
                closingTime,
                image: req.file ? req.file.path : null 
            });

            await business.save();

            
            const encryptedData = await encryptData(JSON.stringify({ message: "Business registered successfully", business, success: true }));
            res.status(201).json({ data: encryptedData });
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            const encryptedData = await encryptData(JSON.stringify({ message: errors, success: false }));
            console.log(errors)
            return res.status(400).json({ data: encryptedData });
        }

        const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
        console.log(error)
        res.status(500).json({ data: encryptedData });
    }
};

export const getAllBusinessController=async(req,res)=>{
    try {
        const allBusiness=await Business.find()
        const encryptedData = await encryptData(JSON.stringify({ message: "Business Fetched",allBusiness, success:true }));
        res.status(500).json({ data: encryptedData });

    } catch (error) {
         const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
         return res.status(500).json({ data: encryptedData });
    }
}

export const getSingleBusinessController=async(req,res)=>{
    const {id}=req.params
    try {
        const oneBusiness=await Business.findById(id)
        const encryptedData = await encryptData(JSON.stringify({ message: "Business Fetched",oneBusiness, success:true }));
        res.status(500).json({ data: encryptedData });

    } catch (error) {
         const encryptedData = await encryptData(JSON.stringify({ message: "Server Error", success: false }));
         return res.status(500).json({ data: encryptedData });
    }
}