import { BelongsToGetAssociationMixin } from "sequelize";
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Center } from "./center.model";

/**
 * Holiday model represents a holiday for a specific center.
 * Each holiday has a reason and a date, and is unique per center per day.
 */
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
    /** Reason for the holiday (e.g., "Independence Day") */
    @AllowNull(false)
    @Column(DataType.TEXT)
    reason!: string;

    /** Date of the holiday (YYYY-MM-DD) */
    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date!: string;

    /** Timestamp when the holiday was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the holiday was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the holiday was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    /** Foreign key: Center ID for which the holiday is applicable */
    @AllowNull(false)
    @ForeignKey(() => Center)
    @Column(DataType.INTEGER)
    centerId!: number;

    /** Association: Holiday belongs to a Center */
    @BelongsTo(() => Center)
    center!: Center;

    // 🔁 Mixins for Center association
    /** Get the center for this holiday */
    public getCenter!: BelongsToGetAssociationMixin<Center>;
}