export class PointLogDto{
    id: number;
    userId: string;
    reviewId: string;
    pointId: string;
    placeId: string;
    operator: string;
    type: string;
    point: number;
    createdAt: Date;


    constructor(){}

    createPointLog(reviewEventDto,operationInfo){
      const {userId,reviewId,placeId} = reviewEventDto;
      const pointLog = new PointLogDto();
      
      pointLog.userId = userId;
      pointLog.reviewId = reviewId;
      pointLog.placeId = placeId;
      pointLog.operator = operationInfo.operator;
      pointLog.type = operationInfo.type;
      pointLog.point = operationInfo.point

      return pointLog;
    }

    createOperationInfo(operator:string,logType:string,point:number){
      const operationInfo = new PointLogDto();
      operationInfo.operator = operator;
      operationInfo.type = logType;
      operationInfo.point = point;
      
      return operationInfo; 
    }

  
}