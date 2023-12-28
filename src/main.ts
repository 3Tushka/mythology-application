import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useWebSocketAdapter(new IoAdapter(app));

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
