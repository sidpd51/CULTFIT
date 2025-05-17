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
    paranoid: true
})
export class User extends Model<User> {

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
    phone_number!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    strike_count!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    no_show_count!: number;

    @AllowNull
    @Column(DataType.DATE)
    banned_until!: Date | null;

    @CreatedAt
    @Column({ field: 'created_at' })
    created_at!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updated_at!: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deleted_at!: Date;

    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, serverConfig.SALT);
        }
    }
}
