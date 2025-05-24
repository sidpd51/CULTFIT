import { addMinutes } from "date-fns";
import { AllowNull, BeforeCreate, BelongsTo, Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Center } from "./center.model";
import { ClassSchedule } from "./classSchedule.model";
import { ClassType } from "./classType.model";

/**
 * ClassInstance model represents a single occurrence of a scheduled class.
 * Each instance is linked to a class schedule, center, and class type.
 * Used for booking and attendance tracking.
 */
@Table({
    tableName: 'class_instances',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class ClassInstance extends Model {

    /** Foreign key: ClassSchedule this instance belongs to */
    @AllowNull(false)
    @ForeignKey(() => ClassSchedule)
    @Column(DataType.INTEGER)
    classScheduleId!: number;

    /** Foreign key: Center where this class instance is held */
    @AllowNull(false)
    @ForeignKey(() => Center)
    @Column(DataType.INTEGER)
    centerId!: number;

    /** Foreign key: ClassType for this class instance */
    @AllowNull(false)
    @ForeignKey(() => ClassType)
    @Column(DataType.INTEGER)
    classTypeId!: number;

    /** Date of the class instance (YYYY-MM-DD) */
    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    date!: Date;

    /** Start time of the class instance (HH:mm) */
    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    startTime!: string;

    /** End time of the class instance (HH:mm), auto-calculated before create */
    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    endTime!: string;

    /** Status of the class instance: SCHEDULED or CANCELLED */
    @AllowNull(false)
    @Default('SCHEDULED')
    @Column({
        type: DataType.ENUM('SCHEDULED', 'CANCELLED')
    })
    status!: 'SCHEDULED' | 'CANCELLED';

    /** Maximum number of participants allowed */
    @AllowNull(false)
    @Default(50)
    @Column
    capacity!: number;

    /** Timestamp when the class instance was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the class instance was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the class instance was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;

    /** Association: ClassInstance belongs to ClassType */
    @BelongsTo(() => ClassType)
    classType!: ClassType;

    /** Association: ClassInstance belongs to Center */
    @BelongsTo(() => Center)
    center!: Center;

    /** Association: ClassInstance belongs to ClassSchedule */
    @BelongsTo(() => ClassSchedule)
    classSchedule!: ClassSchedule;

    /**
     * Before creating a class instance, automatically set the endTime
     * based on startTime and a default duration (50 minutes).
     */
    @BeforeCreate
    static setEndTime(instance: ClassInstance) {
        if (instance.startTime) {
            const [hours, minutes] = instance.startTime.split(':').map(Number);
            const start = new Date(0, 0, 0, hours, minutes);
            const end = addMinutes(start, 50);
            const endTimeStr = end.toTimeString().split(' ')[0].slice(0, 5);
            instance.endTime = endTimeStr;
        }
    }
}