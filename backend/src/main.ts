import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('todo');
  await app.listen(PORT, () => {
    logger.log(`The server is runnig on port http://localhost:${PORT}`);
  });
}
bootstrap();
