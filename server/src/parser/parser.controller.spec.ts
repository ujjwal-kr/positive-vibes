import { Test, TestingModule } from '@nestjs/testing';
import { ParserController } from './parser.controller';

describe('Parser Controller', () => {
  let controller: ParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParserController],
    }).compile();

    controller = module.get<ParserController>(ParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
