import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsString, IsUUID } from "class-validator";
import { ReviewImageDto } from "./reviewImage.dto";

export enum action {"ADD","MOD","DELETE"};

export class ReviewEventDto {

  @ApiProperty({description: '타입'})
  @IsString()
  type : string
  
  @ApiProperty({description: '행위'})
  @IsEnum(action,{each: true})
  action : string
  
  @ApiProperty({description: '리뷰 아이디'})
  @IsUUID()
  reviewId : string
  
  @ApiProperty({description: '리뷰'})
  @IsString()
  content : string

  @ApiProperty({description: '사진'})
  @IsArray()
  attachedPhotoIds: ReviewImageDto[]
  
  @ApiProperty({description: '유저 아이디'})
  @IsUUID()
  userId: string
  
  @ApiProperty({description: '장소 아이디'})
  @IsUUID()
  placeId: string

}


