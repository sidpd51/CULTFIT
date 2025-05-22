import { AllowNull, BelongsToMany, Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";
import { ClassSchedule } from "./classSchedule.model";
import { ClassScheduleDay } from "./classScheduleDay.model";
import { BelongsToManyGetAssociationsMixin } from "sequelize";

/**
 * Day model represents a day of the week (e.g., Monday, Tuesday).
 * Used to associate class schedules with specific days.
 */
@Table({
    tableName: 'days',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Day extends Model {
    /** Name of the day (must be unique, e.g., "Monday") */
    @AllowNull(false)
    @Column({ unique: true })
    name!: string;

    /**
     * Many-to-many association: Day <-> ClassSchedule
     * Represents all class schedules that occur on this day.
     */
    @BelongsToMany(() => ClassSchedule, () => ClassScheduleDay)
    classSchedule!: ClassSchedule[];

    /** Timestamp when the day record was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    created_at!: Date;

    /** Timestamp when the day record was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updated_at!: Date;

    /** Timestamp when the day record was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deleted_at!: Date;

    // 🔁 Mixins for Day association
    /** Get all class schedules for this day */
    public getClassSchedules!: BelongsToManyGetAssociationsMixin<ClassSchedule>;
}