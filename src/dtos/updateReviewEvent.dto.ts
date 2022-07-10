import { IsArray, IsEnum, IsString, IsUUID } from "class-validator";
import { ReviewImageDto } from "./reviewImage.dto";

export enum action { "ADD","MOD","DELETE"};

export class UpdateReviewEventDto {

  @IsString()
  type : string
  
  @IsEnum(action,{each: true})
  action : action
  
  @IsUUID()
  reviewId : string
  
  @IsString()
  content : string

  @IsArray()
  attachedPhotoIds: ReviewImageDto[]
  
  @IsUUID()
  userId: string
  
  @IsUUID()
  placeId: string

}


