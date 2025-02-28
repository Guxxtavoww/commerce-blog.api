import { ZodDto, createZodDto } from 'nestjs-zod';
import type { ZodSchema, ZodTypeDef } from 'zod';

import {
  PaginationBaseDTO,
  PaginationBaseWithSortingDTO,
} from 'src/shared/dtos/pagination-base.dto';

function createPaginatedZodDTO<
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

function createPaginatedZodDTOWithSorting<
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

const createZodDTO = createZodDto;

export {
  createPaginatedZodDTO,
  createPaginatedZodDTOWithSorting,
  createZodDTO,
};
