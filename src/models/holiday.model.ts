import { BelongsToGetAssociationMixin } from "sequelize";
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Center } from "./center.model";



@Table({
    tableName: 'holidays',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
        {
            name: "unique_holiday_per_center_per_day",
            unique: true,
            fields: ["center_id", "date"],
        }
    ]
})

export class Holiday extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    reason!: string;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date!: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    @AllowNull(false)
    @ForeignKey(() => Center)
    @Column(DataType.INTEGER)
    centerId!: number;

    @BelongsTo(() => Center)
    center!: Center;

    public getCenter!: BelongsToGetAssociationMixin<Center>;
}