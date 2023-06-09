import type { AbstractEntity } from 'src/common/abstract.entity';
import type { AbstractDto } from 'src/common/dto/abstract.dto';
import type { Constructor } from 'src/types';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
