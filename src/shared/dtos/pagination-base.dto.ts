import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationBaseDTO {
  @ApiPropertyOptional({
    type: Number,
    description: 'The current page number',
    example: 1,
    default: 1,
  })
  page: number = 1;

  @ApiPropertyOptional({
    type: Number,
    description: 'Number of items per page',
    example: 10,
    default: 10,
    maximum: 100,
  })
  limit: number = 10;
}

export class PaginationBaseWithSortingDTO extends PaginationBaseDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'Sorting field and direction (e.g., "created_at.DESC")',
    example: 'created_at.DESC',
  })
  sort?: string;
}
