import bcrypt from 'bcrypt';
import {
    AllowNull,
    BeforeCreate,
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

@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
})
export class User extends Model {

    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @Unique
    @Column({
        type: DataType.STRING,
        validate: {
            is: /^\+\d+$/i, // Ensures phone number starts with +
        },
    })
    phoneNumber!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    strikeCount!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    noShowCount!: number;

    @AllowNull
    @Column(DataType.DATE)
    bannedUntil!: Date | null;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, serverConfig.SALT);
        }
    }
}
