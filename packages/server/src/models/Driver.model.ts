/* eslint-disable no-mixed-spaces-and-tabs */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Driver")
export class Driver {
    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	name: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    	date: Date;

    @Column({ unique: true })
    	phone: string;

    @Column()
    	carModel: string;

    @Column()
    	licensePlate: string;

    @Column()
    	locationId: number;

    @Column()
    	userId: number;
}