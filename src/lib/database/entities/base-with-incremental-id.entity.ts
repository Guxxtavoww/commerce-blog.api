import { PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from './timestamp.entity';

export abstract class BaseEntityWithIncrementalId extends TimestampEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
