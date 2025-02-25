import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { postContentMaxLength } from '../../../modules/post/entities/post.entity';

import { baseColumns } from '../common/base-columns.common';

export class Posts1730390223631 implements MigrationInterface {
  private readonly tableName = 'posts' as const;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          ...baseColumns,
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
            length: `${postContentMaxLength}`,
          },
          {
            name: 'banner_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'author_id',
            type: 'uuid',
          },
          {
            name: 'likes_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'comments_count',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_POSTS_TITLE',
        columnNames: ['title'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_POSTS_AUTHOR_ID',
        columnNames: ['author_id'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_POSTS_LIKES_COUNT',
        columnNames: ['likes_count'],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_POSTS_COMMENTS_COUNT',
        columnNames: ['comments_count'],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'FK_POSTS_AUTHOR_ID');

    await queryRunner.dropIndex(this.tableName, 'IDX_POSTS_TITLE');
    await queryRunner.dropIndex(this.tableName, 'IDX_POSTS_AUTHOR_ID');
    await queryRunner.dropIndex(this.tableName, 'IDX_POSTS_LIKES_COUNT');
    await queryRunner.dropIndex(this.tableName, 'IDX_POSTS_COMMENTS_COUNT');

    await queryRunner.dropTable(this.tableName);
  }
}
