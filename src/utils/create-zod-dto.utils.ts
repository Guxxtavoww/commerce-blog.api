import { ZodDto, createZodDto } from 'nestjs-zod';
import type { ZodSchema, ZodTypeDef } from 'zod';

import {
  PaginationBaseDTO,
  PaginationBaseWithSortingDTO,
} from 'src/shared/dtos/pagination-base.dto';

function createPaginatedZodDto<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  class AugmentedZodDto extends PaginationBaseDTO {
    public static isZodDto = true;
    public static schema = schema;

    public static create(input: unknown) {
      return this.schema.parse(input);
    }
  }

  return AugmentedZodDto as unknown as ZodDto<TOutput, TDef, TInput>;
}

function createPaginatedZodDtoWithSorting<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  class AugmentedZodDto extends PaginationBaseWithSortingDTO {
    public static isZodDto = true;
    public static schema = schema;

    public static create(input: unknown) {
      return this.schema.parse(input);
    }
  }

  return AugmentedZodDto as unknown as ZodDto<TOutput, TDef, TInput>;
}

export {
  createPaginatedZodDto,
  createPaginatedZodDtoWithSorting,
  createZodDto,
};
