import { type ZodRawShape, z } from 'zod';

import {
  optionalSortSchema,
  integerNumberSchema,
  optionalPaginationParamSchema,
} from '../shared/schemas.shared';

const pageSchema = optionalPaginationParamSchema.default(1);
const limitSchema = optionalPaginationParamSchema
  .default(10)
  .parse(integerNumberSchema.max(100, 'Max Limit is 100'));

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
