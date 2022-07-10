import { ReviewImage } from 'src/entities/reviewImage.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ReviewImage)
export class ReviewImageRepository extends Repository<ReviewImage> {}
