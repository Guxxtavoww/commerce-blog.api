import { type ZodRawShape, z } from 'zod';

import {
  optionalSortSchema,
  paginationParamSchema,
} from '../shared/schemas.shared';

const pageSchema = paginationParamSchema.default(1);
const limitSchema = paginationParamSchema
  .default(10)
  .refine((val) => val < 100, { message: 'Max Limit is 100' });
// .pipe(integerNumberSchema.max(100));

export function createPaginationSchema<T extends ZodRawShape>(fields: T) {
  const paginationSchema = z.object({
    page: pageSchema,
    limit: limitSchema,
    sort: optionalSortSchema,
    ...fields,
  });

  return paginationSchema;
}

export function createPaginationSchemaWithoutOrderBy<T extends ZodRawShape>(
  fields: T,
) {
  const paginationSchema = z.object({
    page: pageSchema,
    limit: limitSchema,
    ...fields,
  });

  return paginationSchema;
}
