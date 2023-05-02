import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const requset = ctx.switchToHttp().getRequest();
    if (data) return requset.user[data];

    return requset.user;
  },
);
