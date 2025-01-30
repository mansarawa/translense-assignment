import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, "Business name is required"],
        trim: true,
        minlength: [2, "Business name must be at least 2 characters long"],
        maxlength: [100, "Business name can't exceed 100 characters"]
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        minlength: [5, "Address must be at least 5 characters long"]
    },
    openingTime: {
        type: String,        
    },
    closingTime: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
        match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"]
    },
    image: {
        type: String, 
        
    }
}, { timestamps: true });

const Business = mongoose.model("Business", businessSchema);
export default Business;
