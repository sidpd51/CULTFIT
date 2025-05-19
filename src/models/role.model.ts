import { BelongsToManyGetAssociationsMixin } from 'sequelize';
import { AllowNull, BelongsToMany, Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './userrole.model';

@Table({
    tableName: 'roles',
    timestamps: true,
    paranoid: true
})
export class Role extends Model {

    @AllowNull(false)
    @Column({ unique: true })
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users!: User[];

    @CreatedAt
    @Column({ field: 'created_at' })
    created_at!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updated_at!: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deleted_at!: Date;

    // 🔁 Mixins for User association
    public getUsers!: BelongsToManyGetAssociationsMixin<User>;
}