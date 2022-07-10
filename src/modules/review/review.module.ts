import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewDto } from "src/dtos/review.dto";
import { ReviewImageRepository } from "../image/image.repository";
import { PointModule } from "../point/point.module";
import { PointLogRepository } from "../point/pointLog.repository";
import { ReviewRepository } from "./review.repository";
import { ReviewCreate } from "./reviewCreate";
import { ReviewDelete } from "./reviewDelete";
import { ReviewUpdate } from "./reviewUpdate";

@Module({
    imports: [TypeOrmModule.forFeature([ReviewRepository,PointLogRepository,ReviewImageRepository]),PointModule],
    controllers: [],
    providers: [ReviewCreate,ReviewUpdate,ReviewDelete,ReviewDto],
    exports: [ReviewCreate,ReviewUpdate,ReviewDelete,ReviewDto]
  })
  export class ReviewModule {}
  