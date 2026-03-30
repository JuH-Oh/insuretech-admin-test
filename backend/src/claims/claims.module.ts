import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './entity/claim.entity';
import { ClaimPhoto } from './entity/claim-photo.entity';
import { ClaimAiReason } from './entity/claim-ai-reason.entity';
import { ClaimPrecedent } from './entity/claim-precedent.entity';
import { ClaimEvent } from './entity/claim-event.entity';
import { TypeADetail } from './entity/type-a-detail.entity';
import { TypeBDetail } from './entity/type-b-detail.entity';
import { Estimation } from '@/estimations/entity/estimation.entity';
import { EstimationItem } from '@/estimations/entity/estimation-item.entity';
import { Approval } from '@/approvals/entity/approval.entity';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Claim,
      ClaimPhoto,
      ClaimAiReason,
      ClaimPrecedent,
      ClaimEvent,
      TypeADetail,
      TypeBDetail,
      Estimation,
      EstimationItem,
      Approval,
    ]),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [TypeOrmModule],
})
export class ClaimsModule {}
