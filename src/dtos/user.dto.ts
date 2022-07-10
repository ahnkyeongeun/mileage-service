import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UserDto{

    @ApiProperty({description: '유저 아이디'})
    @IsUUID()
    userId: string
}