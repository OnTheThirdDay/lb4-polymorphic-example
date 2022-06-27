import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, EntityCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Deliverable, DeliverableRelations, Delivery, DeliveryRelations} from '../models';

export class DeliveryRepository extends DefaultCrudRepository<
  Delivery,
  typeof Delivery.prototype.id,
  DeliveryRelations
> {

  public readonly deliverable: HasOneRepositoryFactory<Deliverable, typeof Delivery.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LetterRepository')
    protected letterRepositoryGetter: Getter<EntityCrudRepository<Deliverable, typeof Deliverable.prototype.id, DeliverableRelations>>,
    @repository.getter('ParcelRepository')
    protected parcelRepositoryGetter: Getter<EntityCrudRepository<Deliverable, typeof Deliverable.prototype.id, DeliverableRelations>>,
  ) {
    super(Delivery, dataSource);
    this.deliverable = this.createHasOneRepositoryFactoryFor(
      'deliverable',
      // use a dictionary of repoGetters instead of a single repoGetter instance
      {Letter: letterRepositoryGetter, Parcel: parcelRepositoryGetter},
    );

    this.registerInclusionResolver('deliverable', this.deliverable.inclusionResolver);
  }
}
