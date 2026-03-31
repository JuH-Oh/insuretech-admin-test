import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
export declare abstract class BaseEntity extends TypeOrmBaseEntity {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
