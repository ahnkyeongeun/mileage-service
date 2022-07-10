import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PointLogDto } from "src/dtos/pointLog.dto";
import { PointService } from "./point.service";
import { PointCalculator } from "./pointCalculator";
import { PointLogRepository } from "./pointLog.repository";

@Module({
    imports: [TypeOrmModule.forFeature([PointLogRepository])],
    controllers: [],
    providers: [PointLogDto,PointCalculator,PointService,],
    exports: [PointLogDto,PointCalculator,PointService]
  })
  export class PointModule {}
  