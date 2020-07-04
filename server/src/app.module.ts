import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ScraperModule } from './scraper/scraper.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Difining mongo PATH in the main app module, and schemas to be defined in child modules
    MongooseModule.forRoot('mongodb://localhost:27017/positive-vibes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    ScraperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}