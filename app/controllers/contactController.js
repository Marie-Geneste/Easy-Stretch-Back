const nodemailer = require("nodemailer");

const contactController = {

    contact: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body || {};
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ error: 'Invalid payload' });
            }

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, 
                auth: {
                    user: process.env.GMAIL_USER,     
                    pass: process.env.EMAIL_PASS,  
                },
            });

            const info = await transporter.sendMail({
                from: `Easy Stretch <${process.env.GMAIL_USER}>`, 
                to: process.env.GMAIL_USER, 
                replyTo: email, 
                subject: `[Easy Stretch] ${subject} — ${name} <${email}>`,
                text: `De: ${name} <${email}>\n\n${message}`,
            });

            return res.status(200).json({ ok: true, messageId: info.messageId });
        } catch (err) {
            console.error('CONTACT_ERROR', err);
            return res.status(500).json({ error: 'Mail send failed' });
        }
    },
};





module.exports = contactController;