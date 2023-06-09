import { Controller, Get } from '@nestjs/common';
import { MasterCompanyDto } from './dto/master-company.dto';
import { MasterCompanyService } from './master-company.service';

@Controller('master-company')
export class MasterCompanyController {
  constructor(private masterCompanyService: MasterCompanyService) {}

  @Get('/')
  async getCompanies() {
    return this.masterCompanyService.getAllCompany();
  }
}
