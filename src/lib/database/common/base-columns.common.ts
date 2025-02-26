import type { TableColumnOptions } from 'typeorm';

import type { BaseEntity } from '../entities/base.entity';
import type { TimestampEntity } from '../entities/timestamp.entity';
import type { BaseEntityWithIncrementalId } from '../entities/base-with-incremental-id.entity';

interface MyTableColumnOptions extends Omit<TableColumnOptions, 'name'> {
  readonly name:
    | keyof TimestampEntity
    | keyof BaseEntity
    | keyof BaseEntityWithIncrementalId;
}

export const dateColumns = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
    isNullable: true,
  },
] as MyTableColumnOptions[];

export const baseColumns = [
  {
    name: 'id',
    type: 'uuid',
    generationStrategy: 'uuid',
    isPrimary: true,
    default: 'uuid_generate_v4()',
  },
  ...dateColumns,
] as MyTableColumnOptions[];

export const baseColumnsWithIncrementalId = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  ...dateColumns,
] as MyTableColumnOptions[];
