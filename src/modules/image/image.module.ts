import { Module } from "@nestjs/common";
import { ReviewImageDto } from "src/dtos/reviewImage.dto";


@Module({
    providers: [ReviewImageDto]
  })
  export class ReviewImageModule {}