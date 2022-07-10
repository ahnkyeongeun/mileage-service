import { Injectable } from "@nestjs/common";
import { PointLogDto } from "src/dtos/pointLog.dto";
import { ReviewDto } from "src/dtos/review.dto";
import { ReviewEventDto } from "src/dtos/reviewEvent.dto";
import { ReviewImageDto } from "src/dtos/reviewImage.dto";
import { ReviewRepository } from "src/modules/review/review.repository";
import { ReviewImageRepository } from "../image/image.repository";
import { PointCalculator } from "../point/pointCalculator";
import { PointLogRepository } from "../point/pointLog.repository";
import { LogType, Operator } from "./reviewEnums";

@Injectable()
export class ReviewUpdate {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly pointLogRepository:PointLogRepository,
        private readonly reviewImageRepository:ReviewImageRepository,
        private readonly pointLogDto:PointLogDto,
        private readonly reviewDto:ReviewDto,
        private readonly pointCalculator:PointCalculator,
    ) {}

    async validateReviewExistence(reviewEventDto:ReviewEventDto) {
      const {userId,placeId} = reviewEventDto;
      const review = await this.reviewRepository.findOne({ where:{placeId:placeId,userId:userId}});
      if(!review){
        throw new Error('해당 장소에서 등록한 리뷰가 존재하지 않습니다.');
      }

    }

    async updateReview(reviewEventDto:ReviewEventDto) {
      const {userId,reviewId,placeId,content,attachedPhotoIds} = reviewEventDto;
      const reviewDto = this.reviewDto.createReview(reviewId,userId,placeId,content,attachedPhotoIds.map((image)=>new ReviewImageDto(image,reviewId)));
      await this.reviewImageRepository.delete({reviewId:reviewId});
      await this.reviewRepository.save(reviewDto);
    }

    async updateContentPoint(reviewEventDto:ReviewEventDto) {
      const {userId,placeId,content} = reviewEventDto;
      const review = await this.reviewRepository.findOne({ where:{placeId:placeId,userId:userId}});
      const reviewCount = review.content.length;
      const updateReviewCount = content.length;
      const {operator,point} = this.getPointFromComparedLength(reviewCount,updateReviewCount);

      //증감 여부를 확인
      if(operator in Operator){
        const operationInfo = this.pointLogDto.createOperationInfo(operator,LogType.CONTENT_REVIEW,point);
        const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);
        await this.pointLogRepository.save(pointLog);
      }

    }

    async updateImagePoint(reviewEventDto:ReviewEventDto) {
      const {reviewId,attachedPhotoIds} = reviewEventDto;
      const reviewImageCount = await this.reviewImageRepository.count({ where:{reviewId:reviewId}});//image 가져오기
      const updateReviewImageCount = attachedPhotoIds.length;
      const {operator,point} = this.getPointFromComparedLength(reviewImageCount,updateReviewImageCount);

      //증감 여부를 확인
      if(operator in Operator){
          const operationInfo = this.pointLogDto.createOperationInfo(operator,LogType.IMAGE_REVIEW,point);
          const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);
          await this.pointLogRepository.save(pointLog);
        }
    }


    getPointFromComparedLength(existingData,updateData) {
        const existingDataLength = existingData;
        const updateDataLength = updateData;

        switch(true) {
            case existingDataLength > updateDataLength && updateDataLength === 0:
                return this.pointCalculator.createPointCalculator(Operator.SUB,1);
            case existingDataLength < updateDataLength && existingDataLength === 0:
                return this.pointCalculator.createPointCalculator(Operator.ADD,1);
            default:
                return this.pointCalculator.createPointCalculator('EQUAL',0);
        }

    }


}

