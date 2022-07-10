
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchrma = new Schema({
    Name:{
        type: String
    },
    FamilyName:{
        type: String
    },
    Email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    PromoCode: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Country: {
        type: String
    },
    City: {
        type: String
    },
    Street: {
        type: String
    },
    ZipCode: {
        type: String
    },
    Password: {
        type: String,
        required: true
    },
    Spare1: {
        type: String
    },
    Spare2: {
        type: String
    },
    Spare3: {
        type: Number
    },
    Spare4: {
        type: Number
    },
}, {timestamps:true});

const User = mongoose.model('User', userSchrma)
module.exports = User