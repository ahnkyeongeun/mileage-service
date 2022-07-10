import { Injectable } from "@nestjs/common";
import { ReviewDelete } from "../review/reviewDelete";
import { Operator } from "../review/reviewEnums";
import { PointLogRepository } from "./pointLog.repository";

@Injectable()
export class PointService {

    constructor(private readonly pointRepoistory: PointLogRepository){}


    async getPointByUser(userId:string) {

        const pointLogs = await this.pointRepoistory.find({userId:userId});
        if(pointLogs.length > 0){
            const totalPoint = this.getTotalPoint(pointLogs);
            return {totalPoint:totalPoint};
        }else{
            return {totalPoint:0};
        }
    }


    getTotalPoint(pointLogs) {
        const totalSub = pointLogs.filter(log => { return log.operator === Operator.SUB})
        .map(log => log.point)
        .reduce((sum,current) => {return sum + current},0);

        const totalAdd = pointLogs.filter(log => { return log.operator === Operator.ADD})
        .map(log => log.point)
        .reduce((sum,current) => {return sum + current},0);

        const totalPoint = totalAdd - totalSub;

        return totalPoint;
    }

    



    
}