import { SelectQueryBuilder } from 'typeorm';
import { Alias } from 'typeorm/query-builder/Alias';
import type { Driver } from 'typeorm/driver/Driver';
import { DriverUtils } from 'typeorm/driver/DriverUtils';

import { PageMetaDto } from './common/dto/page-meta.dto';
import { PageOptionsDTO } from './common/dto/page-options.dto';
import { compact, map } from 'lodash';
import { AbstractEntity } from './common/abstract.entity';
import { AbstractDto } from './common/dto/abstract.dto';
import { PageDto } from './common/dto/page.dto';
import { VIRTUAL_COLUMN_KEY } from './decorators/virtual-column.decorator';

function groupRows<T>(
  rawResults: T[],
  alias: Alias,
  driver: Driver,
): Map<string, T[]> {
  const raws = new Map();
  const keys: string[] = [];

  if (alias.metadata.tableType === 'view') {
    keys.push(
      ...alias.metadata.columns.map((column) =>
        DriverUtils.buildAlias(driver, alias.name, column.databaseName),
      ),
    );
  } else {
    keys.push(
      ...alias.metadata.primaryColumns.map((column) =>
        DriverUtils.buildAlias(driver, alias.name, column.databaseName),
      ),
    );
  }

  for (const rawResult of rawResults) {
    const id = keys
      .map((key) => {
        const keyValue = rawResult[key];

        if (Buffer.isBuffer(keyValue)) {
          return keyValue.toString('hex');
        }

        if (typeof keyValue === 'object') {
          return JSON.stringify(keyValue);
        }

        return keyValue;
      })
      .join('_'); // todo: check partial

    const items = raws.get(id);

    if (!items) {
      raws.set(id, [rawResult]);
    } else {
      items.push(rawResult);
    }
  }

  return raws;
}

declare global {
  export type Uuid = string & { _uuidBrand: undefined };

  interface Array<T> {
    toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];

    toPageDto<Dto extends AbstractDto>(
      this: T[],
      pageMetaDto: PageMetaDto,
      // FIXME make option type visible from entity
      options?: unknown,
    ): PageDto<Dto>;
  }
}

declare module 'typeorm' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface QueryBuilder<Entity> {
    searchByString(q: string, columnNames: string[]): this;
  }

  interface SelectQueryBuilder<Entity> {
    paginate(
      this: SelectQueryBuilder<Entity>,
      pageOptionsDto: PageOptionsDTO,
      options?: Partial<{ takeAll: boolean }>,
    ): Promise<[Entity[], PageMetaDto]>;
  }
}

Array.prototype.toDtos = function <
  Entity extends AbstractEntity<Dto>,
  Dto extends AbstractDto,
>(options?: unknown): Dto[] {
  return compact(
    map<Entity, Dto>(this as Entity[], (item) => item.toDto(options as never)),
  );
};

Array.prototype.toPageDto = function (
  pageMetaDto: PageMetaDto,
  options?: unknown,
) {
  return new PageDto(this.toDtos(options), pageMetaDto);
};

SelectQueryBuilder.prototype.paginate = async function (
  pageOptionsDto: PageOptionsDTO,
  options?: Partial<{ takeAll: boolean }>,
) {
  if (!options?.takeAll) {
    this.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
  }

  const itemCount = await this.getCount();

  const { entities, raw } = await this.getRawAndEntities();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const alias = this.expressionMap.mainAlias!;

  const group = groupRows(raw, alias, this.connection.driver);

  const keys = alias.metadata.primaryColumns.map((column) =>
    DriverUtils.buildAlias(
      this.connection.driver,
      alias.name,
      column.databaseName,
    ),
  );

  for (const rawValue of raw) {
    const id = keys
      .map((key) => {
        const keyValue = rawValue[key];

        if (Buffer.isBuffer(keyValue)) {
          return keyValue.toString('hex');
        }

        if (typeof keyValue === 'object') {
          return JSON.stringify(keyValue);
        }

        return keyValue;
      })
      .join('_');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entity = entities.find((item) => item.id == id) as AbstractEntity;

    const metaInfo: Record<string, string> =
      Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};

    for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
      const items = group.get(id);

      if (items) {
        for (const item of items) {
          entity[propertyKey] ??= item[name];
        }
      }
    }
  }

  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto,
  });

  return [entities, pageMetaDto];
};
