// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { createCustomer, downloadCustomerExcel } = require('../controller/cusController'); // Import the controller functions

router.post('/submit-customer', createCustomer);
router.get('/download-excel', downloadCustomerExcel);

module.exports = router;
