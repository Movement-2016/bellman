const contactTemplate = ({ fname, lname, email, phone, message }) => `

First Name: ${fname}
Last Name: ${lname}
Email: ${email}
Phone: ${phone}

Message: "${message}"

`;

module.exports = contactTemplate;
