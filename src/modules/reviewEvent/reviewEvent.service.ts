import { Injectable} from '@nestjs/common';
import { ReviewEventDto } from 'src/dtos/reviewEvent.dto';
import { ReviewCreate } from 'src/modules/review/reviewCreate';
import { ReviewDelete } from 'src/modules/review/reviewDelete';
import { ReviewUpdate } from 'src/modules/review/reviewUpdate';


@Injectable()
export class ReviewEventService {

  constructor(
    private readonly reviewCreate: ReviewCreate,
    private readonly reviewUpdate: ReviewUpdate,
    private readonly reviewDelete: ReviewDelete
  ) {}

  async createReview(reviewEventDto:ReviewEventDto){
    //한장소에 하나의 리뷰
    await this.reviewCreate.validateReview(reviewEventDto);
    //보너스 검증 - 특정 장소의 첫 리뷰
    await this.reviewCreate.saveFirstReviewPoint(reviewEventDto);
    //리뷰와 리뷰이미지 저장 
    await this.reviewCreate.saveReview(reviewEventDto);
    //내용 - 1장 이상 텍스트 
    await this.reviewCreate.saveContentPoint(reviewEventDto)
    //내용 - 이미지가 1개 이상인가 
    await this.reviewCreate.saveImagePoint(reviewEventDto);

  }    

  async updateReview(reviewEventDto:ReviewEventDto){
    //수정하기 전 해당 리뷰가 존재하는지 검증
    await this.reviewUpdate.validateReviewExistence(reviewEventDto);
    //내용의 변경사항에 대한 포인트 업데이트
    await this.reviewUpdate.updateContentPoint(reviewEventDto);
    //사진의 변경사항에 대한 포인트 업데이트 
    await this.reviewUpdate.updateImagePoint(reviewEventDto);
    //리뷰 업데이트
    await this.reviewUpdate.updateReview(reviewEventDto);
  }  

  async deleteReview(reviewEventDto:ReviewEventDto){
    //리뷰 삭제
    await this.reviewDelete.deleteReview(reviewEventDto);
    //리뷰로 얻은 포인트 계산 및 모두 차감
    await this.reviewDelete.subReviewPoint(reviewEventDto);
  }    

}