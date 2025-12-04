import { Controller, Post, UseInterceptors, UploadedFile, Param, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentsService } from './payments.service';

// TODO: Add proper authentication guards
// @UseGuards(JwtAuthGuard)

@Controller('payments')
export class PaymentProofController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':paymentId/upload-proof')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPaymentProof(
    @Param('paymentId') paymentId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // TODO: Upload file to storage (S3, MinIO, etc.) and get URL
    // For now, return a placeholder URL
    const fileUrl = `/uploads/payment-proofs/${file.filename}`;

    // Update payment with proof URL
    await this.paymentsService.updatePaymentStatus(paymentId, 'pending', fileUrl);

    return {
      success: true,
      message: 'Payment proof uploaded successfully',
      fileUrl,
    };
  }
}

