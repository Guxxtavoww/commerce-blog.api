import { z } from 'zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { createZodDTO } from 'src/utils/create-zod-dto.utils';

import { stringSchema } from '../../../shared/schemas.shared';
import { createNullableTransform } from '../../../utils/create-nullable-transform.util';
import { postCommentContentMaxLength } from '../entities/post-comment.entity';

export const updatePostCommentSchema = z.object({
  content: createNullableTransform(
    stringSchema.max(postCommentContentMaxLength),
  ),
});

export type UpdatePostCommentPayload = z.infer<typeof updatePostCommentSchema>;

export class UpdatePostCommentDTO extends createZodDTO(
  updatePostCommentSchema,
) {
  @ApiPropertyOptional()
  content?: string;
}
