import { Review } from 'src/entities/review.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {}
