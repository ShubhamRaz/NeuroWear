const nodemailer = require('nodemailer');

async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pksrofficial@gmail.com',
      pass: 'jwfc urqc qbjr ffwr'
    }
  });

  let info = await transporter.sendMail({
    from: '"Test" <pksrofficial@gmail.com>',
    to: 'pankajkr6810@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email'
  });

  console.log('Test Email Sent:', info.response);
}

sendTestEmail().catch(console.error);
