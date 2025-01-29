import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    businessId:{
        type:String,
        require:[true,'Business id is required']
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters long"],
        maxlength: [100, "Full name can't exceed 100 characters"]
    },
    profilePic: {
        type: String, 
        required: [true, "Profile picture is required"],
        validate: {
            validator: function (value) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(value);
            },
            message: "Invalid image URL format"
        }
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
    }
}, { timestamps: true });

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
