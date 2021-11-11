const moment = require("moment")

const generateInvoiceDetail = ({ customer_name, contact_number, products }) => {
  const mappedProducts = products.map(data => {
    return {
      item: data.name,
      description: "",
      quantity: data.quantity,
      price: data.selling_price,
      tax: "",
    };
  })
  var totalAmount = 0;
  products.forEach(data => {
    totalAmount += data.quantity * data.selling_price;
  })

  const invoiceDetail = {
    shipping: {
      name: customer_name,
      address: "1234 Main Street",
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      postal_code: 94111,
    },
    items: mappedProducts,
    subtotal: totalAmount,
    total: totalAmount,
    order_number: 1234222,
    header: {
      company_name: "Medical Inventory System",
      company_logo: "logo.jpg",
      company_address:
        "Nice Invoice. 123 William Street 1th Floor New York, NY 123456",
    },
    footer: {
      text: "Thanks for Shopping with us.",
    },
    currency_symbol: "₹",
    date: {
      billing_date: moment().format("MMMM Do YYYY").toString(),
      due_date: moment().format("MMMM Do YYYY").toString(),
    },
  };

  return invoiceDetail;
}

module.exports = {generateInvoiceDetail};