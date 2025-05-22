import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

/**
 * UserRole is a join table for the many-to-many relationship
 * between User and Role.
 */
@Table({
    tableName: 'user_roles',
    underscored: true
})
export class UserRole extends Model {
    /** Foreign key: User ID */
    @ForeignKey(() => User)
    @Column
    userId!: number;

    /** Foreign key: Role ID */
    @ForeignKey(() => Role)
    @Column
    roleId!: number;
}