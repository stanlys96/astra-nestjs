import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.services';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ApiConfigService);
  if (configService.documentationEnabled) {
    setupSwagger(app);
  }
  await app.listen(
    `${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
    '0.0.0.0',
  );
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
