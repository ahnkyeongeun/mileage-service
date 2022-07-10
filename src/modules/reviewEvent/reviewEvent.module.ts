import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResponseDto } from "src/dtos/response.dto";
import { ReviewImageRepository } from "src/modules/image/image.repository";
import { PointModule } from "src/modules/point/point.module";
import { PointLogRepository } from "src/modules/point/pointLog.repository";
import { ReviewModule } from "src/modules/review/review.module";
import { ReviewRepository } from "../review/review.repository";
import { ReviewEventController } from "./reviewEvent.controller";
import { ReviewEventService } from "./reviewEvent.service";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository,PointLogRepository,ReviewImageRepository]),ReviewModule,PointModule],
  controllers: [ReviewEventController],
  providers: [
    ReviewEventService,ResponseDto
  ],
})
export class ReviewEventModule {}
