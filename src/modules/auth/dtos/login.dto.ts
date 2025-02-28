import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

import { createZodDTO } from 'src/utils/create-zod-dto.utils';

import {
  emailStringSchema,
  stringSchema,
} from '../../../shared/schemas.shared';

export const loginSchema = z.object({
  user_email: emailStringSchema,
  password: stringSchema,
});

export type LoginPayload = z.infer<typeof loginSchema>;

export class LoginDTO extends createZodDTO(loginSchema) {
  @ApiProperty({
    description: 'The email of the user',
    example: 'marcellosamura@gmail.com',
  })
  user_email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'senha123',
  })
  password: string;
}
