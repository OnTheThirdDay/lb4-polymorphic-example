import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Parcel, ParcelRelations} from '../models';

export class ParcelRepository extends DefaultCrudRepository<
  Parcel,
  typeof Parcel.prototype.id,
  ParcelRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Parcel, dataSource);
  }
}
