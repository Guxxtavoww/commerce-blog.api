import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import type { User } from 'src/modules/user/entities/user.entity';

import { Public } from '../../../shared/decorators/auth.decorator';
import { UuidParam } from '../../../shared/decorators/uuid-param.decorator';
import { LoggedInUserIdDecorator } from '../../../shared/decorators/logged-in-user-id.decorator';

import type { PostComment } from '../entities/post-comment.entity';
import { PostCommentService } from '../services/post-comment.service';
import { CreatePostCommentDTO } from '../dtos/create-post-comment.dto';
import { UpdatePostCommentDTO } from '../dtos/update-post-comment.dto';
import { PaginatePostCommentsDTO } from '../dtos/paginate-post-comments.dto';

@ApiTags('post-comment')
@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Public()
  @Get('paginate')
  paginate(@Query() queries: PaginatePostCommentsDTO) {
    return this.postCommentService.paginatePostComments(queries);
  }

  @Get(':id')
  getOne(@UuidParam('id') id: PostComment['id']) {
    return this.postCommentService.getPostCommentById(id);
  }

  @Post('')
  create(
    @Body() body: CreatePostCommentDTO,
    @LoggedInUserIdDecorator() logged_in_user_id: User['id'],
  ) {
    return this.postCommentService.createPostComment(body, logged_in_user_id);
  }

  @Put(':id')
  update(
    @UuidParam('id') id: PostComment['id'],
    @Body() body: UpdatePostCommentDTO,
    @LoggedInUserIdDecorator() logged_in_user_id: User['id'],
  ) {
    return this.postCommentService.updatePostComment(
      id,
      body,
      logged_in_user_id,
    );
  }

  @Delete(':id')
  delete(
    @UuidParam('id') id: PostComment['id'],
    @LoggedInUserIdDecorator() logged_in_user_id: User['id'],
  ) {
    return this.postCommentService.deletePostComment(id, logged_in_user_id);
  }
}
