const moment = require("moment")

const generateInvoiceDetail = ({ customer_name, contact_number, products, orderNumber, user }) => {
  const mappedProducts = products.map(data => {
    return {
      item: data.name,
      quantity: data.quantity,
      price: data.selling_price,
    };
  })
  var totalAmount = 0;
  products.forEach(data => {
    totalAmount += data.quantity * data.selling_price;
  })

  const invoiceDetail = {
    shipping: {
      name: customer_name,
      contact_number
    },
    items: mappedProducts,
    subtotal: totalAmount,
    total: totalAmount,
    order_number: orderNumber,
    header: {
      company_name: user.company_name,
      company_logo: __dirname + '/logo.jpg',
      company_address: user.company_address,
    },
    footer: {
      text: user.footer_text,
    },
    gst_number: user.gst_number
  };

  return invoiceDetail;
}

module.exports = {generateInvoiceDetail};