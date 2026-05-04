const { Router } = require('express');
const nodemailer = require('nodemailer');

const router = Router();

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

router.post('/', async (req, res) => {
  try {
    const { name, mobile, email, message, bank, loanType, source } = req.body || {};

    if (!name || !mobile || !email || !message || !bank || !loanType) {
      return res.status(400).json({ message: 'All lead form fields are required.' });
    }

    const adminEmail = process.env.LEAD_TO_EMAIL || 'credirelief@gmail.com';
    const subject = `Loan settlement enquiry - ${loanType} - ${bank}`;
    const text = [
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Email: ${email}`,
      `Bank: ${bank}`,
      `Loan Type: ${loanType}`,
      `Source: ${source || 'website'}`,
      '',
      `Message: ${message}`
    ].join('\n');

    const transporter = createTransporter();
    let delivered = false;
    let mailError = null;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: adminEmail,
          replyTo: email,
          subject,
          text
        });
        delivered = true;
      } catch (sendError) {
        mailError = sendError;
        console.error('SMTP delivery failed:', sendError.message);
        if (sendError.response) {
          console.error('SMTP response:', sendError.response);
        }
      }
    } else {
      console.log('Lead captured but SMTP is not configured yet.');
      console.log({ name, mobile, email, message, bank, loanType, source });
    }

    return res.json({
      message: delivered
        ? 'Your enquiry has been sent to admin.'
        : 'Your enquiry was received, but email delivery failed. Please try again later.',
      delivered,
      mailError: mailError ? mailError.message : undefined
    });
  } catch (error) {
    console.error('Lead submission failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    return res.status(500).json({ message: 'Unable to process your enquiry right now. Please try again.' });
  }
});

module.exports = router;