import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize';
import { UserRole } from './userrole.model';

@Table({
    paranoid: true
})
export class Role extends Model {

    @Column({ unique: true })
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users!: User[];

    @Column(DataType.DATE)
    deletedAt!: Date;

    // 🔁 Mixins for User association
    public addUser!: BelongsToManyAddAssociationMixin<User, number>;
    public getUsers!: BelongsToManyGetAssociationsMixin<User>;
    public setUsers!: BelongsToManySetAssociationsMixin<User, number>;
    public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
}