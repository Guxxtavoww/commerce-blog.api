import { z } from 'zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { createPaginatedZodDTOWithSorting } from 'src/utils/create-zod-dto.utils';

import {
  uuidSchema,
  optionalUuidSchema,
  optionalStringToIntegerSchema,
} from '../../../shared/schemas.shared';
import { createPaginationSchema } from '../../../utils/create-pagination-schema.utils';

export const paginatePostCommentsSchema = createPaginationSchema({
  post_id: uuidSchema,
  parent_id: optionalUuidSchema,
  commented_by_id: optionalUuidSchema,
  skip: optionalStringToIntegerSchema,
});

export type PaginatePostCommentsPayload = z.infer<
  typeof paginatePostCommentsSchema
>;

export class PaginatePostCommentsDTO extends createPaginatedZodDTOWithSorting(
  paginatePostCommentsSchema,
) {
  @ApiProperty()
  post_id: string;

  @ApiPropertyOptional()
  parent_id?: string;

  @ApiPropertyOptional()
  commented_by_id?: string;

  @ApiPropertyOptional({ type: Number, example: '5' })
  skip?: number;
}
