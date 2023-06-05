import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetByIdDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly id: string;
}
