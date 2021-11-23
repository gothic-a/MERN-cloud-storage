import nodemailer from 'nodemailer'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
        })
    }

    generateActivationMail(code) {
        return `
            <div style="background-color: #f5fbff; border-radius: 5px; display: flex; align-items: center; flex-direction: column; padding: 30px">
                <p>Welcome to Cloud Storage!</p>
                <p>Use the following code to activate your account:</p>
                <h5 style="margin-top: 30px; letter-spacing: 1px">${code}</h5>
            </div>
        `
    }

    async sendCode(email, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Activate your account',
            text: '',
            html: this.generateActivationMail(code)
        })
    }
}

export default MailService 