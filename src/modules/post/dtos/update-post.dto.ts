import { z } from 'zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { createZodDTO } from 'src/utils/create-zod-dto.utils';

import {
  stringSchema,
  optionalUrlStringSchema,
  optionalStringSchema,
} from '../../../shared/schemas.shared';
import { postContentMaxLength } from '../entities/post.entity';
import { createNullableTransform } from '../../../utils/create-nullable-transform.util';

export const updatePostSchema = z.object({
  title: optionalStringSchema,
  banner_url: optionalUrlStringSchema,
  content: createNullableTransform(stringSchema.max(postContentMaxLength)),
});

export type UpdatePostPayload = z.infer<typeof updatePostSchema>;

export class UpdatePostDTO extends createZodDTO(updatePostSchema) {
  @ApiPropertyOptional({
    example: 'Título 1',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'conteudo do post',
  })
  content?: string;

  @ApiPropertyOptional()
  banner_url?: string;
}
