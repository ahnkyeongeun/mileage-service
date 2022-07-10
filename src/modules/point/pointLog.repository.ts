import { ConsoleLogger } from '@nestjs/common';
import { PointLog } from 'src/entities/pointLog.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PointLog)
export class PointLogRepository extends Repository<PointLog> {
    
}
