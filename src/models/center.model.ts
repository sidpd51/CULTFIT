import { AllowNull, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Holiday } from "./holiday.model";
import { HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin } from "sequelize";
import { ClassSchedule } from "./classSchedule.model";

/**
 * Center model represents a fitness center location.
 * Each center can have multiple holidays and class schedules.
 */
@Table({
    tableName: 'centers',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class Center extends Model {

    /** Name of the center (must be unique) */
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(255))
    name!: string;

    /** Physical location/address of the center */
    @AllowNull(false)
    @Column(DataType.TEXT)
    location!: string;

    /** Timestamp when the center was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the center was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the center was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    /**
     * Association: Center has many Holidays.
     * On center deletion, holidays are also deleted (CASCADE).
     */
    @HasMany(() => Holiday, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
    })
    holidays!: Holiday[];

    /**
     * Association: Center has many ClassSchedules.
     * On center deletion, class schedules are also deleted (CASCADE).
     */
    @HasMany(() => ClassSchedule, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    })
    classSchedules!: ClassSchedule[];

    // 🔁 Mixins for association (Center -> ClassSchedules)
    /** Get all class schedules for this center */
    public getClassSchedules!: HasManyGetAssociationsMixin<ClassSchedule>;
    /** Add a class schedule to this center */
    public addClassSchedule!: HasManyAddAssociationMixin<ClassSchedule, number>;
    /** Check if a class schedule belongs to this center */
    public hasClassSchedule!: HasManyHasAssociationMixin<ClassSchedule, number>;

    // 🔁 Mixins for association (Center -> Holidays)
    /** Get all holidays for this center */
    public getHolidays!: HasManyGetAssociationsMixin<Holiday>;
    /** Add a holiday to this center */
    public addHoliday!: HasManyAddAssociationMixin<Holiday, number>;
    /** Check if a holiday belongs to this center */
    public hasHoliday!: HasManyHasAssociationMixin<Holiday, number>;
}