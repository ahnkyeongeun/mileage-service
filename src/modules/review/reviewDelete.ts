import { Injectable } from "@nestjs/common";
import { PointLogDto } from "src/dtos/pointLog.dto";
import { ReviewEventDto } from "src/dtos/reviewEvent.dto";
import { ReviewRepository } from "src/modules/review/review.repository";
import { PointService } from "../point/point.service";
import { PointLogRepository } from "../point/pointLog.repository";
import { LogType, Operator } from "./reviewEnums";

@Injectable()
export class ReviewDelete {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly pointLogRepository:PointLogRepository,
        private readonly pointService:PointService,
        private readonly pointLogDto:PointLogDto
    ) {}

    async deleteReview(reviewEventDto:ReviewEventDto) {
      const {reviewId} = reviewEventDto;
      await this.reviewRepository.delete({id:reviewId});
    }

    async subReviewPoint(reviewEventDto:ReviewEventDto) {
        const {reviewId,userId,placeId} = reviewEventDto;
        //해당 리뷰로 얻은 포인트 계산
        const pointLogs = await this.pointLogRepository.find({where:{userId:userId,reviewId:reviewId,placeId:placeId}});
        const totalPoint = this.pointService.getTotalPoint(pointLogs);
        //해당 리뷰로 얻은 포인트 모두 차감
        const pointLog = this.getPointLog(reviewEventDto,totalPoint);
        await this.pointLogRepository.save(pointLog);
    }



    getPointLog(reviewEventDto,totalPoint) {
        const operationInfo = this.pointLogDto.createOperationInfo(Operator.SUB,LogType.DELETE_REVIEW,totalPoint);
        const pointLog = this.pointLogDto.createPointLog(reviewEventDto,operationInfo);

        return pointLog;
    }













}