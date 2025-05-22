import { BelongsToManyGetAssociationsMixin } from 'sequelize';
import { AllowNull, BelongsToMany, Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './userrole.model';

/**
 * Role model represents a user role (e.g., Admin, Member).
 * Each role can be assigned to multiple users.
 */
@Table({
    tableName: 'roles',
    timestamps: true,
    paranoid: true
})
export class Role extends Model {

    /** Name of the role (must be unique) */
    @AllowNull(false)
    @Column({ unique: true })
    name!: string;

    /**
     * Many-to-many association: Role <-> User
     * Represents all users assigned to this role.
     */
    @BelongsToMany(() => User, () => UserRole)
    users!: User[];

    /** Timestamp when the role was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    created_at!: Date;

    /** Timestamp when the role was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updated_at!: Date;

    /** Timestamp when the role was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deleted_at!: Date;

    // 🔁 Mixins for User association
    /** Get all users for this role */
    public getUsers!: BelongsToManyGetAssociationsMixin<User>;
}