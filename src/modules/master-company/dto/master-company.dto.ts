import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class MasterCompanyDto extends AbstractDto {
  @ApiProperty()
  companycode: string;

  @ApiProperty()
  companyname: string;

  @ApiPropertyOptional()
  description?: string;
}
