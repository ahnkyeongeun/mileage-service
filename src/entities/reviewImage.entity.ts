import { Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Review } from './review.entity';

  @Entity({
    name: 'review_image',
  })
  export class ReviewImage {
    @PrimaryGeneratedColumn('uuid')
    imageId: string;
  
    @Column({ type:"uuid" })
    reviewId: string;

    @ManyToOne(() => Review,review => review.images,{onDelete: 'CASCADE'})
    @JoinColumn({name: 'reviewId'})
    review: Review;
  
  }

  