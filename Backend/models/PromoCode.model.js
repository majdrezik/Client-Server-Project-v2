const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
  promoCode: { type: String, required: true },
  description: { type: String },
}, {
  timestamps: true,
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;