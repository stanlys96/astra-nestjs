import { Constructor } from 'src/types';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractDto } from './dto/abstract.dto';

export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  id: number;
  createdtime: Date;
  createddate: number;
  sourcecreatedmodifiedtime: Date;

  toDto(options?: O): DTO;
}

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'createdby', nullable: true })
  createdby: string;

  @Column({ type: 'varchar', name: 'updatedby', nullable: true })
  updatedby: string;

  @CreateDateColumn()
  createdtime: Date;

  @Column({ type: 'int', name: 'createddate', nullable: true })
  createddate: number;

  @UpdateDateColumn()
  sourcecreatedmodifiedtime: Date;

  @Column({ type: 'datetime', name: 'sync_date', nullable: true })
  sync_date: Date;

  private dtoClass?: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(`
        You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function
      `);
    }

    return new dtoClass(this, options);
  }
}
