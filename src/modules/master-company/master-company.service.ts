import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterEESCompany } from './master-company.entity';
import { MasterCompanyDto } from './dto/master-company.dto';

@Injectable()
export class MasterCompanyService {
  constructor(
    @InjectRepository(MasterEESCompany)
    private masterCompanyRepository: Repository<MasterEESCompany>,
  ) {}

  async getAllCompany(): Promise<MasterCompanyDto[] | undefined> {
    try {
      const query = this.masterCompanyRepository
        .createQueryBuilder('mastercompany')
        .orderBy('mastercompany.id', 'ASC')
        .getMany();
      return query;
    } catch (error) {
      throw error;
    }
  }
}
