const fs = require("fs")
const excel = require("exceljs");
const PDFDocument = require('pdfkit');
exports.generateExcel = (data, res) => {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Appointments");

  // Add data to the Excel sheet
  worksheet.columns = [
    { header: "Full Name", key: "fullname" },
    { header: "Email", key: "email" },
    { header: "Date", key: "date" },
    { header: "age", key: "age" },
    { header: "gender", key: "gender" },
    { header: " Appointment Type", key: "type" },
    { header: "phone", key: "phone" },
    { header: "address", key: "address" },
  
  ];

  data.forEach((appointment) => {
    worksheet.addRow({
      fullname: appointment.fullname,
      email: appointment.email,
      date: appointment.date,
      age: appointment.age,
      gender: appointment.gender,
      type: appointment.type,
      phone: appointment.phone,
      address: appointment.address,
      
   
    });
  });


  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=appointments.xlsx"
  );

  // Stream the Excel workbook to the response
  workbook.xlsx.write(res).then(() => {
    res.end();
  });
};

exports.generatePDF = (data, res) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  // Add data to the PDF document
  doc.fontSize(16);
  doc.text("One Health Medical Center", { align: "right" });
  doc.text("Appointments", { align: "center" });

  data.forEach((appointment) => {
    doc
      .fontSize(12)
      .text(`Full Name: ${appointment.fullname}`)
      .text(`Email: ${appointment.email}`)
      .text(`Date: ${appointment.date}`)
      .text(`Age: ${appointment.age}`)
      .text(`Gender: ${appointment.gender}`)
      .text(`Appointment Type: ${appointment.type}`)
      .text(`Phone Number: ${appointment.phone}`)
      .text(`Address: ${appointment.address}`)
      // Add more properties as needed
      .moveDown(); // Move to the next line
  });

  // Set response headers to trigger download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=appointments.pdf");

  doc.end();
};
