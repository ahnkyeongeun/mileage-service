import { ReviewImage } from 'src/entities/reviewImage.entity';
import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index} from 'typeorm';

  @Entity({name: 'review'})
  export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ type:"uuid" })
    userId: string;

    @Index()
    @Column({ type:"uuid" })
    placeId: string;
  
    @Column({ length: 255 , nullable: true })
    content: string;

    @OneToMany(()=> ReviewImage, (reviewImage) => reviewImage.review, {cascade: true})
    images: ReviewImage[];
  
    @CreateDateColumn({ type: "timestamp", name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", name: 'updatedAt' })
    updatedAt: Date;
  }

  