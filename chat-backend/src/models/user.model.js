import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            isUnique: true,
            isRequired: true
        },
        fullName: {
            type: String,
            isRequired: true
        },
        password: {
            type: String,
            isRequired: true,
            minLength: 6
        },
        profilePic:
        {
            type: String,
            default: ""
        },
        Timestamp: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model("User", userSchema);
export default User;

