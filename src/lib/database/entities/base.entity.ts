import { PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from './timestamp.entity';

export abstract class BaseEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
