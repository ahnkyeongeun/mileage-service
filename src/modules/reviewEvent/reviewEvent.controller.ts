import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ResponseDto } from "src/dtos/response.dto";
import { ReviewEventDto } from "src/dtos/reviewEvent.dto";
import { UserDto } from "src/dtos/user.dto";
import { PointService } from "src/modules/point/point.service";
import { ReviewEventService } from "./reviewEvent.service";


@Controller('')
export class ReviewEventController {
    constructor(
        private readonly reviewEventService: ReviewEventService,
        private readonly pointService: PointService,  
    ) {}


    @Post('events')
    async postEvent(@Body() reviewEventDto : ReviewEventDto) {

        try {
            const action = reviewEventDto.action;

            switch(action){
                case 'ADD':
                    await this.reviewEventService.createReview(reviewEventDto);
                    break;
                case 'MOD':
                    await this.reviewEventService.updateReview(reviewEventDto);
                    break;
                case 'DELETE':
                    await this.reviewEventService.deleteReview(reviewEventDto);
                    break;
            }
            return ResponseDto.Ok();      
        } catch (error) {
            console.error(error);
            return ResponseDto.ERROR(error.message);
        }

    }

    @Get('users/:userId/point')
    async getPoint(@Param() UserDto:UserDto) {
        try {
            return ResponseDto.OK_WITH(await this.pointService.getPointByUser(UserDto.userId));
        } catch (error) {
            console.error(error);
            return ResponseDto.ERROR(error);
        }
    }
}