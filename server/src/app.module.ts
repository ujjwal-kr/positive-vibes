import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [
    // Difining mongo PATH in the main app module, and schemas to be defined in child modules
    MongooseModule.forRoot('mongodb://localhost:27017/positive-vibes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    ParserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}