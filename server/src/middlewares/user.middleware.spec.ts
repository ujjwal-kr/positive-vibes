import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    expect(new UserMiddleware()).toBeDefined();
  });
});
