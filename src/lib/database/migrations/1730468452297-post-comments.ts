import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { postContentMaxLength } from '../../../modules/post/entities/post.entity';

import { baseColumns } from '../common/base-columns.common';

export class PostComments1730468452297 implements MigrationInterface {
  private readonly tableName = 'post-comments' as const;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          ...baseColumns,
          {
            name: 'commented_by_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'varchar',
            length: String(postContentMaxLength),
          },
          {
            name: 'post_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'replies_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'parent_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_post_comments_commented_by_id',
        columnNames: ['commented_by_id'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_post_comments_post_id',
        columnNames: ['post_id'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_post_comments_parent_id',
        columnNames: ['parent_id'],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['commented_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: this.tableName,
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    const foreignKeys =
      table?.foreignKeys.filter((fk) =>
        ['commented_by_id', 'post_id', 'parent_id'].includes(
          fk.columnNames[0] as string,
        ),
      ) ?? [];

    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKey(this.tableName, fk);
    }

    await queryRunner.dropIndex(
      this.tableName,
      'IDX_post_comments_commented_by_id',
    );
    await queryRunner.dropIndex(this.tableName, 'IDX_post_comments_post_id');
    await queryRunner.dropIndex(this.tableName, 'IDX_post_comments_parent_id');

    await queryRunner.dropTable(this.tableName);
  }
}
