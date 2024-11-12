// controllers/customerController.js
const exceljs = require('exceljs');
const Customer = require('../model/Customer'); 




const createCustomer = async (req, res) => {
  try {
    const {
      firstName, lastName, brand, vehicleInfo, address, paymentTypes, phone, email, additionalInfo, agreedToTerms
    } = req.body;

    // Create a new customer record
    const newCustomer = new Customer({
      firstName, lastName, brand, vehicleInfo, address, paymentTypes, phone, email, additionalInfo, agreedToTerms
    });

    await newCustomer.save();
    res.status(201).json({ message: 'Customer data saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving customer data', error: err });
  }
};


const downloadCustomerExcel = async (req, res) => {
  try {
 
    const customers = await Customer.find();

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Customer Data');

   
    worksheet.columns = [
      { header: 'First Name', key: 'firstName', width: 20 },
      { header: 'Last Name', key: 'lastName', width: 20 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Vehicle Info', key: 'vehicleInfo', width: 30 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Payment', key: 'payment', width: 15 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Additional Info', key: 'additionalInfo', width: 50 },
      { header: 'Agreed to Terms', key: 'agreedToTerms', width: 15 }
    ];

   
    customers.forEach(customer => {
      worksheet.addRow({
        firstName: customer.firstName,
        lastName: customer.lastName,
        brand: customer.brand,
        vehicleInfo: customer.vehicleInfo,
        address: customer.address,
        paymentTypes: customer.payment,
        phone: customer.phone,
        email: customer.email,
        additionalInfo: customer.additionalInfo,
        agreedToTerms: customer.agreedToTerms
      });
    });


    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];  

    
    res.setHeader('Content-Disposition', `attachment; filename=customers-${formattedDate}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: 'Error generating Excel file', error: err });
  }
};

module.exports = {
  createCustomer,
  downloadCustomerExcel
};

