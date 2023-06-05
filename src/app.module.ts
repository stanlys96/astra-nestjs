import './boilerplate.polyfill';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.services';
import { ConfigModule } from '@nestjs/config';
import { MasterCompanyModule } from './modules/master-company/master-company.module';

const ApiModules = [MasterCompanyModule];

@Module({
  imports: [
    ...ApiModules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        return configService.mssqlConfig;
      },
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
