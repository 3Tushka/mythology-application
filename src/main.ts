import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: ['Content-Type, Accept, Authorization'],
  };
  app.enableCors(options);
  app.use(cookieParser());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use('/public', serveStatic(join(__dirname, '..', 'public')));

  const config = new DocumentBuilder()
    .setTitle('Mytholog-application')
    .setDescription('Mythology documentation')
    .setVersion('1.0.0')
    .addTag('MYTH')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`App Started on ${PORT} Port`));
}
bootstrap();
