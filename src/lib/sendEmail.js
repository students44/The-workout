import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io', // Default or env
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Define email options
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || 'noreply@theworkout.com',
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    try {
        if (!process.env.SMTP_USER) {
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
