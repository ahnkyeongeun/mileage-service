import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index} from 'typeorm';

  @Entity({
    name: 'point'
  })
  export class PointLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type:"uuid" })
    userId: string;

    @Index()
    @Column({ type:"uuid" })
    reviewId: string;

    @Index()
    @Column({ type:"uuid" })
    placeId: string;

    @Column({ type: "varchar"})
    operator: string;

    @Column({ type: "varchar"})
    type: string;

    @Column({ type:"int" })
    point: number;

    // @ManyToOne(() => Point, point => point.log, {onDelete: 'CASCADE'})
    // @JoinColumn({name: 'pointId'})
    // point: Point;
  
    @CreateDateColumn({ type: "timestamp", name: 'createdAt' })
    createdAt: Date;


    constructor(){}

    createPointLog(userId,reviewId,operator,type,point){
      const pointLog = new PointLog();
      pointLog.userId = userId;
      pointLog.reviewId = reviewId;
      pointLog.operator = operator;
      pointLog.type = type;
      pointLog.point = point
      return pointLog;
    }



  }

  