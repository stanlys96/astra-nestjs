import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterEESCompany } from './master-company.entity';
import { MasterCompanyDto } from './dto/master-company.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { GetByIdDto } from 'src/common/dto/get-by-id.dto';
import { AddCompanyDto } from './dto/add-company.dto';

@Injectable()
export class MasterCompanyService {
  constructor(
    @InjectRepository(MasterEESCompany)
    private masterCompanyRepository: Repository<MasterEESCompany>,
  ) {}

  async getAllCompany(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyDto>> {
    try {
      const query = this.masterCompanyRepository
        .createQueryBuilder('mastercompany')
        .orderBy('mastercompany.id', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getCompanyById(id: GetByIdDto) {
    try {
      const query = await this.masterCompanyRepository
        .createQueryBuilder('mastercompany')
        .where('mastercompany.id = :id', { id: id.id })
        .getOne();
      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async addCompany(company: AddCompanyDto) {
    try {
      const query = await this.masterCompanyRepository
        .createQueryBuilder('mastercompany')
        .insert()
        .into(MasterEESCompany)
        .values({
          companycode: company.companycode,
          companyname: company.companyname,
          description: company.description,
        })
        .execute();
      return query;
    } catch (error) {
      throw error;
    }
  }
}
