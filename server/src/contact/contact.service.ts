import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(ContactService.name);

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }

    async sendEmail(data: { name: string; email: string; subject: string; message: string }) {
        const { name, email, subject, message } = data;

        const mailOptions = {
            from: `"${name}" <${this.configService.get('SMTP_FROM') || email}>`, // Sender address
            to: this.configService.get('SMTP_USER'), // Receiver (Admin)
            replyTo: email,
            subject: `[B2B Inquiry] ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
            html: `
<h3>New B2B Inquiry Received</h3>
<p><strong>From:</strong> ${name} (${email})</p>
<p><strong>Subject:</strong> ${subject}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            this.logger.error('Error sending email', error);
            throw error;
        }
    }
}
