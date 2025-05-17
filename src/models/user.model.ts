import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize';
import { Role } from './role.model';
import { UserRole } from './userrole.model';


@Table({
    paranoid: true
})
export class User extends Model {

    @Column({ unique: true })
    username!: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];

    @Column(DataType.DATE)
    deletedAt!: Date;

    // 🔁 Mixins for User association
    public addRole!: BelongsToManyAddAssociationMixin<Role, number>;
    public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
    public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
    public hasRole!: BelongsToManyHasAssociationMixin<Role, number>;
}