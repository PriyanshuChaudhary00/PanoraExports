import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    async sendMessage(@Body() body: { name: string; email: string; subject: string; message: string }) {
        try {
            return await this.contactService.sendEmail(body);
        } catch (error) {
            throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
