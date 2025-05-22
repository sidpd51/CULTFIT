import { AllowNull, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { ClassSchedule } from "./classSchedule.model";

/**
 * ClassType model represents a type of fitness class (e.g., Yoga, HIIT).
 * Each class type can have multiple class schedules.
 */
@Table({
    tableName: 'class_types',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class ClassType extends Model {
    /** Name of the class type (must be unique) */
    @AllowNull(false)
    @Unique
    @Column
    name!: string;

    /** Description of the class type */
    @Column(DataType.TEXT)
    Description!: string;

    /**
     * Association: ClassType has many ClassSchedules.
     * On class type deletion, class schedules are also deleted (CASCADE).
     */
    @HasMany(() => ClassSchedule, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    })
    classSchedules!: ClassSchedule[];

    /** Timestamp when the class type was created */
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;

    /** Timestamp when the class type was last updated */
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;

    /** Timestamp when the class type was soft-deleted (paranoid) */
    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt!: Date;
}