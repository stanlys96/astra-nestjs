import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterEESCompany } from './master-company.entity';
import { MasterCompanyService } from './master-company.service';
import { MasterCompanyController } from './master-company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterEESCompany])],
  providers: [MasterCompanyService],
  controllers: [MasterCompanyController],
})
export class MasterCompanyModule {}
