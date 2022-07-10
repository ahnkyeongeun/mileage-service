import { IsOptional } from "class-validator";

export class ReviewImageDto{

    imageId: string;
    reviewId: string;

    constructor(imageId,reviewId){
        this.imageId = imageId;
        this.reviewId = reviewId;
    };
}

