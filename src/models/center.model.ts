import { AllowNull, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Holiday } from "./holiday.model";
import { HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin } from "sequelize";

@Table({
    tableName: 'centers',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class Center extends Model {

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    name!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    location!: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    @HasMany(() => Holiday, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
    })
    holidays!: Holiday[];

    // 🔁 Mixins for association (Center -> Holidays)
    public getHolidays!: HasManyGetAssociationsMixin<Holiday>;
    public addHOliday!: HasManyAddAssociationMixin<Holiday, number>;
    public hasHoliday!: HasManyHasAssociationMixin<Holiday, number>;
}