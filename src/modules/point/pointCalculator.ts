import { Injectable } from "@nestjs/common";


export class PointCalculator {
    public operator:string;
    public point:number;


    constructor(){}

    createPointCalculator(operator:string,point:number){//이건 그냥 생성자로 처리
        const result = new PointCalculator();
        result.operator = operator;
        result.point = point;
        
        return result;
    }


}