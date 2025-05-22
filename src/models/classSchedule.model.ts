import { AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Center } from "./center.model";
import { ClassType } from "./classType.model";
import { Day } from "./day.model";
import { ClassScheduleDay } from "./classScheduleDay.model";
import { BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManySetAssociationsMixin } from "sequelize";

/**
 * ClassSchedule model represents a scheduled class at a center.
 * Each schedule is linked to a center, class type, and one or more days.
 */
@Table({
    tableName: 'class_schedules',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class ClassSchedule extends Model {

    /** Foreign key: Center where the class is scheduled */
    @AllowNull(false)
    @ForeignKey(() => Center)
    @Column(DataType.INTEGER)
    centerId!: number;

    /** Foreign key: Type of class (e.g., Yoga, HIIT) */
    @AllowNull(false)
    @ForeignKey(() => ClassType)
    @Column(DataType.INTEGER)
    classTypeId!: number;

    /** Whether the class schedule is recurring */
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isRecurring!: boolean;

    /**
     * Many-to-many association: ClassSchedule <-> Day
     * Represents on which days this class is scheduled.
     */
    @BelongsToMany(() => Day, () => ClassScheduleDay)
    days!: Day[]

    /** Association: ClassSchedule belongs to a Center */
    @BelongsTo(() => Center)
    center!: Center;

    /** Association: ClassSchedule belongs to a ClassType */
    @BelongsTo(() => ClassType)
    classType!: ClassType;

    /** Timestamp when the schedule was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the schedule was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the schedule was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    // 🔁 Mixins for Day association
    /** Add a day to this class schedule */
    public addDay!: BelongsToManyAddAssociationMixin<Day, number>;
    /** Get all days for this class schedule */
    public getDays!: BelongsToManyGetAssociationsMixin<Day>;
    /** Set days for this class schedule */
    public setDays!: BelongsToManySetAssociationsMixin<Day, number>;
    /** Check if a day is associated with this class schedule */
    public hasDay!: BelongsToManyHasAssociationMixin<Day, number>;

    // 🔁 Mixins for Center association
    /** Get the center for this class schedule */
    public getCenter!: BelongsToGetAssociationMixin<Center>;
}