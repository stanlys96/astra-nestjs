import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddCompanyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companycode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly companyname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description: string;
}
