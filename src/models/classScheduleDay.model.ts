import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ClassSchedule } from "./classSchedule.model";
import { Day } from "./day.model";

/**
 * ClassScheduleDay is a join table for the many-to-many relationship
 * between ClassSchedule and Day.
 */
@Table(
    {
        tableName: 'class_schedule_days',
        underscored: true
    }
)
export class ClassScheduleDay extends Model {
    /** Foreign key: Day ID */
    @ForeignKey(() => Day)
    @Column
    dayId!: number;

    /** Foreign key: ClassSchedule ID */
    @ForeignKey(() => ClassSchedule)
    @Column
    classScheduleId!: number;
}