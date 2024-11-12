const mongoose = require('mongoose');

// Define the customer schema
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  brand: { type: String, required: true },
  vehicleInfo: { type: String, required: true },
  address: { type: String, required: true },
  paymentTypes: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  additionalInfo: { type: String, required: false },
  agreedToTerms: { type: Boolean, required: true },
}, {
  timestamps: true 
});


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;