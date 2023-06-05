import { Type } from 'class-transformer';
import { Order } from 'src/constants/order';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageOptionsDTO {
  @IsEnum(Order, { each: true })
  readonly order: Order = Order.ASC;
}
