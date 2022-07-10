import { Type } from "class-transformer";
import { IsArray, isArray, IsOptional, IsString } from "class-validator";
import { ReviewImage } from "src/entities/reviewImage.entity";
import { ReviewImageDto } from "./reviewImage.dto";

export class ReviewDto{

    id: string;
    userId: string;//uuid
    placeId: string;
    content: string;
    public images: ReviewImageDto[];// 여기 검증해야함
    createdAt: Date;
    updatedAt: Date;

    constructor(){}

    createReview(reviewId,userId,placeId,content,images: ReviewImageDto[]){
      const review = new ReviewDto();
      review.id = reviewId
      review.userId = userId;
      review.placeId = placeId;
      review.content = content;
      review.images = images

      return review;
    }
}

