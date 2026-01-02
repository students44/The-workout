import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create a transporter
    let transporter;

    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // App Password
            },
        });
        console.log('Transporter initialized using service: gmail');
    } else {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.mailtrap.io', // Default or env
            port: process.env.SMTP_PORT || 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        console.log(`Transporter initialized using host: ${process.env.SMTP_HOST || 'smtp.mailtrap.io'}`);
    }

    // Define email options
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || 'itstudents005@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    try {
        if (!process.env.SMTP_USER && !process.env.GMAIL_USER) {
            console.log('No SMTP_USER provided. Logging email to console instead.');
            console.log('---------------------------------------------------');
            console.log(`To: ${options.email}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Message: ${options.message}`);
            console.log('---------------------------------------------------');
            return;
        }
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
