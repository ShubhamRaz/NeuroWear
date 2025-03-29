const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'root')));

// Pre-order endpoint
app.post('/preorder', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configure Nodemailer transporter with Gmail SMTP settings
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 465,              // Port 465 for SSL, or 587 for TLS
    secure: true,           // true for port 465 (SSL) or false for port 587 (TLS)
    auth: {
      user: 'pksrofficial@gmail.com',        // Replace with your Gmail address
      pass: 'jwfc urqc qbjr ffwr'     // Replace with your generated app password
    },
    debug: true // Enable debug output for troubleshooting
  });

  // Email options
  const mailOptions = {
    from: '"NeuroWear" <pksrofficial@gmail.com>', // Sender address (must match auth.user)
    to: email,                                  // Recipient address
    subject: 'NeuroWear Pre-order Confirmation',
    text: `Dear ${name},

Thank you for pre-ordering the NeuroWear Jacket. We have received your request and will be in touch with more details soon.

Your details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message || 'N/A'}

Best regards,
The NeuroWear Team`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ success: true, message: 'Pre-order submitted and confirmation email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email.', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
