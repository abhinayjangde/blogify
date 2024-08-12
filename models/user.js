import mongoose from "mongoose"
import {createHmac, randomBytes} from "crypto"
import {createToken} from "../services/auth.js"

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    slat: {
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageUrl:{
        type: String,
        default: "/images/default.png",
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
    
},{timestamps: true});
userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return
    const slat = randomBytes(32).toString()
    const hashedPassword = createHmac("sha256", slat).update(user.password).digest("hex")
    this.slat = slat
    this.password = hashedPassword
    next()
});

userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User not found")
    const hashedPassword = user.password
    const slat = user.slat
    const hashedGivenPassword = createHmac("sha256", slat).update(password).digest("hex")
    if(hashedPassword !== hashedGivenPassword){
        throw new Error("Password not matched")
    }
    const token = createToken(user)
    return token
})
const User = mongoose.model("user", userSchema);
export default User