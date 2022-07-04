/* eslint-disable no-mixed-spaces-and-tabs */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Driver")
export class Driver {
    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	name: string;

    @Column({ type: "float", nullable: true })
    	lat: number | null;

    @Column({ type: "float", nullable: true })
    	lng: number | null;

    @Column({ type: "timestamptz" })
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