import { AppMiddlewareMiddleware } from './app-middleware.middleware';

describe('AppMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new AppMiddlewareMiddleware()).toBeDefined();
  });
});
