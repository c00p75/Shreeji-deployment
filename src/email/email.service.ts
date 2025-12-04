import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface BankTransferEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  orderId: number;
  amount: number;
  currency: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    swiftCode?: string;
    iban?: string;
  };
  deadlineHours: number;
}

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendBankTransferInstructions(data: BankTransferEmailData): Promise<void> {
    // In a real implementation, you would use an email service like SendGrid, Resend, or Nodemailer
    // For now, we'll log the email content
    const deadlineDate = new Date();
    deadlineDate.setHours(deadlineDate.getHours() + data.deadlineHours);

    const emailContent = {
      to: data.customerEmail,
      subject: `Bank Transfer Instructions for Order ${data.orderNumber}`,
      html: this.generateBankTransferEmailHtml(data, deadlineDate),
      text: this.generateBankTransferEmailText(data, deadlineDate),
    };

    console.log('Bank Transfer Email:', JSON.stringify(emailContent, null, 2));

    // TODO: Integrate with actual email service
    // Example with Resend:
    // await this.resend.emails.send({
    //   from: 'orders@shreeji.co.zm',
    //   to: data.customerEmail,
    //   subject: emailContent.subject,
    //   html: emailContent.html,
    // });
  }

  private generateBankTransferEmailHtml(data: BankTransferEmailData, deadline: Date): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #807045; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .bank-details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #807045; }
            .bank-details ul { list-style: none; padding: 0; }
            .bank-details li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .bank-details li:last-child { border-bottom: none; }
            .bank-details strong { display: inline-block; width: 150px; }
            .deadline { background-color: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bank Transfer Instructions</h1>
            </div>
            <div class="content">
              <p>Dear ${data.customerName},</p>
              <p>Thank you for your order <strong>${data.orderNumber}</strong>.</p>
              <p>To complete your payment, please transfer the amount of <strong>${data.currency} ${data.amount.toFixed(2)}</strong> to our bank account using the details below:</p>
              
              <div class="bank-details">
                <ul>
                  <li><strong>Bank Name:</strong> ${data.bankDetails.bankName}</li>
                  <li><strong>Account Number:</strong> ${data.bankDetails.accountNumber}</li>
                  <li><strong>Account Name:</strong> ${data.bankDetails.accountName}</li>
                  ${data.bankDetails.swiftCode ? `<li><strong>SWIFT Code:</strong> ${data.bankDetails.swiftCode}</li>` : ''}
                  ${data.bankDetails.iban ? `<li><strong>IBAN:</strong> ${data.bankDetails.iban}</li>` : ''}
                  <li><strong>Reference:</strong> ${data.orderNumber}</li>
                </ul>
              </div>

              <div class="deadline">
                <strong>⚠️ Important:</strong> Please complete the transfer within <strong>${data.deadlineHours} hours</strong> (by ${deadline.toLocaleString()}) to confirm your order. Orders not paid within this timeframe will be automatically cancelled.
              </div>

              <p>After completing the transfer, you can upload proof of payment in your order details page.</p>
              <p>Once we verify your payment, your order will be processed and you'll receive a confirmation email.</p>
              
              <p>If you have any questions, please contact us at sales@shreeji.co.zm</p>
            </div>
            <div class="footer">
              <p>Shreeji - Your Trusted Partner</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateBankTransferEmailText(data: BankTransferEmailData, deadline: Date): string {
    return `
Bank Transfer Instructions for Order ${data.orderNumber}

Dear ${data.customerName},

Thank you for your order ${data.orderNumber}.

To complete your payment, please transfer ${data.currency} ${data.amount.toFixed(2)} to:

Bank Name: ${data.bankDetails.bankName}
Account Number: ${data.bankDetails.accountNumber}
Account Name: ${data.bankDetails.accountName}
${data.bankDetails.swiftCode ? `SWIFT Code: ${data.bankDetails.swiftCode}\n` : ''}${data.bankDetails.iban ? `IBAN: ${data.bankDetails.iban}\n` : ''}Reference: ${data.orderNumber}

IMPORTANT: Please complete the transfer within ${data.deadlineHours} hours (by ${deadline.toLocaleString()}) to confirm your order.

After completing the transfer, you can upload proof of payment in your order details page.

If you have any questions, please contact us at sales@shreeji.co.zm

Shreeji - Your Trusted Partner
    `.trim();
  }
}

