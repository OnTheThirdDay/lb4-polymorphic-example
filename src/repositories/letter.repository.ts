import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Letter, LetterRelations} from '../models';

export class LetterRepository extends DefaultCrudRepository<
  Letter,
  typeof Letter.prototype.id,
  LetterRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Letter, dataSource);
  }
}
