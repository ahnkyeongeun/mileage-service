import { Injectable} from "@nestjs/common";
import { PointLogDto } from "src/dtos/pointLog.dto";
import { ReviewDto } from "src/dtos/review.dto";
import { ReviewEventDto } from "src/dtos/reviewEvent.dto";
import { ReviewImageDto } from "src/dtos/reviewImage.dto";
import { ReviewRepository } from "src/modules/review/review.repository";
import { PointLogRepository } from "../point/pointLog.repository";
import { LogType, Operator } from "./reviewEnums";

@Injectable()
export class ReviewCreate {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly pointLogRepository:PointLogRepository,
        private readonly pointLogDto:PointLogDto,
        private readonly reviewDto:ReviewDto
    ) {}

    async validateReview(reviewEventDto:ReviewEventDto) {
      const {userId,placeId} = reviewEventDto;
      const review = await this.reviewRepository.findOne({ where:{placeId:placeId,userId:userId}});
      
      if(review){
        throw new Error('해당 장소에서 등록한 리뷰가 존재합니다.');
      }

    }

    async saveReview(reviewEventDto:ReviewEventDto) {
      const {userId,reviewId,placeId,content,attachedPhotoIds} = reviewEventDto;
      const reviewDto = this.reviewDto.createReview(reviewId,userId,placeId,content,attachedPhotoIds.map((image)=>new ReviewImageDto(image,reviewId)));
      await this.reviewRepository.save(reviewDto);
    }

    async saveContentPoint(reviewEventDto:ReviewEventDto) {
      const {content} = reviewEventDto;
      const contentLength = content.length;

      if(contentLength > 1){
        const operationInfo = this.pointLogDto.createOperationInfo(Operator.ADD,LogType.CONTENT_REVIEW,1);
        const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);
        await this.pointLogRepository.save(pointLog);
      }
    }

    async saveImagePoint(reviewEventDto:ReviewEventDto) {
      const {attachedPhotoIds} = reviewEventDto;
      const imageLength = attachedPhotoIds.length;

      if(imageLength > 1){
        const operationInfo = this.pointLogDto.createOperationInfo(Operator.ADD,LogType.IMAGE_REVIEW,1);
        const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);
        await this.pointLogRepository.save(pointLog);
      } 
    }

    async saveFirstReviewPoint(reviewEventDto:ReviewEventDto) {
      const {placeId} = reviewEventDto;
      const reviewCountPerPlace = await this.reviewRepository.count({placeId:placeId});
      console.log(reviewCountPerPlace);

      if(reviewCountPerPlace === 0){
        const operationInfo = this.pointLogDto.createOperationInfo(Operator.ADD,LogType.FIRST_REVIEW,1);
        const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);
        await this.pointLogRepository.save(pointLog);
      } 
    }













}