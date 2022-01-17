// Required packages
const fs = require("fs");
const PDFDocument = require("pdfkit");

let niceInvoice = (invoice, path) => {
  let doc = new PDFDocument({ size: "A4", margin: 40 });

  header(doc, invoice);
  customerInformation(doc, invoice);
  invoiceTable(doc, invoice);
  footer(doc, invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

let header = (doc, invoice) => {

    doc.image(invoice.header.company_logo, 50, 45, { width: 50 })
      .fontSize(20)
      .text(invoice.header.company_name, 110, 57)
      .moveDown();

  doc.fontSize(10)
    .text(`GST NUMBER: ${invoice.gst_number}`);

  if(invoice.header.company_address.length!==0){
    companyAddress(doc, invoice.header.company_address);
  }

}

let customerInformation = (doc, invoice)=>{
  doc.fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc.fontSize(10)
    .font("Helvetica-Bold")
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica")
    .text(invoice.order_number, 150, customerInformationTop)
    .font("Helvetica")
    .font("Helvetica-Bold")
    .text("Customer Name:", 50, customerInformationTop+15)
    .font("Helvetica")
    .text(invoice.shipping.name, 150, customerInformationTop+15)
    .font("Helvetica-Bold")
    .text("Customer Number:", 50, customerInformationTop+30)
    .font("Helvetica")
    .text(invoice.shipping.contact_number, 150, customerInformationTop+30)
    .moveDown();

  generateHr(doc, 252);
}

let invoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  tableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Unit Cost",
    "Quantity",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    tableRow(
      doc,
      position,
      item.item,
      item.price,
      item.quantity,
      item.price * item.quantity
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  totalTable(
    doc,
    subtotalPosition,
    "Subtotal",
    invoice.total
  );

  const paidToDatePosition = subtotalPosition + 20;
  doc.font("Helvetica-Bold");
  totalTable(
    doc,
    paidToDatePosition,
    "Total",
    invoice.total
  );
}

let footer = (doc, invoice) => {
  if(invoice.footer.text.length!==0){
    doc.fontSize(10).text(invoice.footer.text, 50, 780, { align: "center", width: 500 });
  }
}

let totalTable = (
  doc,
  y,
  name,
  description
)=>{
  doc.fontSize(10)
    .text(name, 400, y,{ width: 90, align: "right" })
    .text(description, 0, y, { align: "right" })
}

let tableRow = (
  doc,
  y,
  item,
  unitCost,
  quantity,
  lineTotal,
  tax
)=>{
  doc.fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 340, y, { width: 90, align: "right" })
    .text(quantity, 395, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y,{ align: "right" })
}

let generateHr = (doc, y) => {
  doc.strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

let getNumber =  str =>  {
  if(str.length!==0){
    var num = str.replace(/[^0-9]/g, '');
  }else{
    var num = 0;
  }

  return num;
}

let companyAddress = (doc, address) => {
  let str = address;
  let chunks = str.match(/.{0,25}(\s|$)/g);
  let first = 50;
  chunks.forEach(function (i,x) {
    doc.fontSize(10).text(chunks[x], 200, first, { align: "right" });
    first = +first +  15;
  });
}

module.exports = niceInvoice;