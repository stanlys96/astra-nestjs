import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  createdby?: string;

  @ApiPropertyOptional()
  updatedby?: string;

  @ApiProperty()
  createdtime: Date;

  @ApiProperty()
  createddate: number;

  @ApiProperty()
  sourcecreatedmodifiedtime: Date;

  sync_date?: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdtime = entity.createdtime;
      this.createddate = entity.createddate;
      this.sourcecreatedmodifiedtime = entity.sourcecreatedmodifiedtime;
      this.sync_date = entity.sync_date;
    }
  }
}
