import bcrypt from 'bcrypt';
import {
    AllowNull,
    BeforeCreate,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    DeletedAt,
    IsEmail,
    Model,
    Table,
    Unique,
    UpdatedAt
} from 'sequelize-typescript';
import { serverConfig } from '../config';
import { UserRole } from './userrole.model';
import { Role } from './role.model';
import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize';

/**
 * User model represents an application user.
 * Each user can have multiple roles.
 */
@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
})
export class User extends Model {

    /** Name of the user */
    @Column(DataType.STRING)
    name!: string;

    /** Email address of the user (must be unique) */
    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;

    /** Phone number of the user (must be unique, starts with +) */
    @Unique
    @Column({
        type: DataType.STRING,
        validate: {
            is: /^\+\d+$/i, // Ensures phone number starts with +
        },
    })
    phoneNumber!: string;

    /** Hashed password of the user */
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    /** Number of strikes (e.g., for policy violations) */
    @Default(0)
    @Column(DataType.INTEGER)
    strikeCount!: number;

    /** Number of no-shows for bookings */
    @Default(0)
    @Column(DataType.INTEGER)
    noShowCount!: number;

    /** If banned, the date until which the user is banned */
    @AllowNull
    @Column(DataType.DATE)
    bannedUntil!: Date | null;

    /** Timestamp when the user was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the user was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the user was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    /**
     * Many-to-many association: User <-> Role
     * Represents all roles assigned to this user.
     */
    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];

    // 🔁 Mixins for Role association
    /** Add a role to this user */
    public addRole!: BelongsToManyAddAssociationMixin<Role, number>;
    /** Get all roles for this user */
    public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
    /** Set roles for this user */
    public setRoles!: BelongsToManySetAssociationsMixin<Role, number>;
    /** Check if a role is assigned to this user */
    public hasRole!: BelongsToManyHasAssociationMixin<Role, number>;

    /**
     * Hash the user's password before creating the user record.
     * Uses bcrypt and the configured salt.
     */
    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, serverConfig.SALT);
        }
    }
}
