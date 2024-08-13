import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Documentação com Swagger - Teste técnico para starsoft')
  .setDescription(
    'Documentação de API com Módulo de autenticação e CRUD de usuários',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('users')
  .addTag('auth')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
