import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI)

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
    // email: { type: String, required: true, unique },
    // phoneNo: { type: Number, required: true, unique: true },

})

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

export {
    User,
    Account
}