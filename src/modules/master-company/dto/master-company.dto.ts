import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterEESCompany } from '../master-company.entity';

export class MasterCompanyDto extends AbstractDto {
  @ApiProperty()
  companycode: string;

  @ApiProperty()
  companyname: string;

  @ApiPropertyOptional()
  description?: string;

  constructor(masterCompanyEntity: MasterEESCompany) {
    super(masterCompanyEntity, { excludeFields: true });

    this.companyname = masterCompanyEntity.companyname;
    this.companycode = masterCompanyEntity.companycode;
    this.description = masterCompanyEntity.description || undefined;
  }
}
