import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { baseColumns } from '../common/base-columns.common';

export class Users1726061378196 implements MigrationInterface {
  private readonly tableName = 'users' as const;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          ...baseColumns,
          {
            name: 'user_name',
            type: 'varchar',
          },
          {
            name: 'hashed_password',
            type: 'varchar(255)',
          },
          {
            name: 'user_email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_photo_url',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_USER_NAME',
        columnNames: ['user_name'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['user_email'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_PHONE_NUMBER',
        columnNames: ['phone_number'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, 'IDX_USER_NAME');
    await queryRunner.dropIndex(this.tableName, 'IDX_USER_EMAIL');
    await queryRunner.dropIndex(this.tableName, 'IDX_PHONE_NUMBER');
    await queryRunner.dropTable(this.tableName);
  }
}
