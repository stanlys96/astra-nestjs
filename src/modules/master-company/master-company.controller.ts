import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MasterCompanyDto } from './dto/master-company.dto';
import { MasterCompanyService } from './master-company.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { GetByIdDto } from 'src/common/dto/get-by-id.dto';
import { AddCompanyDto } from './dto/add-company.dto';

@ApiTags('master-company')
@Controller('master-company')
export class MasterCompanyController {
  constructor(private masterCompanyService: MasterCompanyService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterCompanyDto })
  async getCompanies(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyDto>> {
    return this.masterCompanyService.getAllCompany(pageOptions);
  }

  @Get('/getOne')
  @ApiCreatedResponse({ type: MasterCompanyDto })
  async getOneCompany(@Query() id: GetByIdDto) {
    return this.masterCompanyService.getCompanyById(id);
  }

  @Post('/addCompany')
  @ApiCreatedResponse({ type: MasterCompanyDto })
  async addCompany(@Body() company: AddCompanyDto) {
    return this.masterCompanyService.addCompany(company);
  }
}
