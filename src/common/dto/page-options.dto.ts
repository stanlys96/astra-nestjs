import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Order } from 'src/constants/order';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageOptionsDTO {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order, { each: true })
  readonly order: Order = Order.ASC;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 1000,
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsOptional()
  @IsString()
  readonly q?: string;
}
