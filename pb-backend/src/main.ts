import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const port = process.env.PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
      .setTitle('Request examples')
      .setDescription('The user API description')
      .setVersion('1.0')
      .addTag('')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors();
  await app.listen(port);
  console.log(`Server started on ${port} port` )
}
bootstrap();
