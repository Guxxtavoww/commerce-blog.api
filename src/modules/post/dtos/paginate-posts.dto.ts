import { z } from 'zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { createPaginatedZodDtoWithSorting } from 'src/utils/create-zod-dto.utils';

import {
  optionalUuidSchema,
  optionalStringSchemaToLowerCase,
} from '../../../shared/schemas.shared';
import { createPaginationSchema } from '../../../utils/create-pagination-schema.utils';

export const paginatePostsSchema = createPaginationSchema({
  title: optionalStringSchemaToLowerCase,
  author_id: optionalUuidSchema,
});

export type PaginatePostsPayload = z.infer<typeof paginatePostsSchema>;

export class PaginatePostsDTO extends createPaginatedZodDtoWithSorting(paginatePostsSchema) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  author_id?: string;
}
