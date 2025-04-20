require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(cors()); 

app.post('/send-email', async (req, res) => {
  const { subject, text, contactNumber, name, mail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailBody = `
    Name: ${name}
    Email: ${mail}
    Contact Number: ${contactNumber}

    Message: ${text}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email failed to send.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
