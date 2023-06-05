import { Column, Entity } from 'typeorm';
import { UseDto } from 'src/decorators/use-dto.decorator';
import { MasterCompanyDto } from './dto/master-company.dto';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity('ms_ees_company')
@UseDto(MasterCompanyDto)
export class MasterEESCompany extends AbstractEntity<MasterCompanyDto> {
  @Column({ type: 'varchar', name: 'companycode', nullable: true })
  companycode: string;

  @Column({ type: 'varchar', name: 'companyname', nullable: true })
  companyname: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;
}
