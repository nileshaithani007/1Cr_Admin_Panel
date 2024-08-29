
const nodemailer = require('nodemailer');
const EmailTemplate = require('./EmailTemplate');

const SendInvitationMail = async (EmailId,OrgName,UserId,InvitationCode) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    console.log(transporter);

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: EmailId,
        subject: process.env.EMAIL_SUBJECT,
        html: EmailTemplate(EmailId,OrgName,UserId,InvitationCode)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ',EmailId, info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

module.exports = {SendInvitationMail};