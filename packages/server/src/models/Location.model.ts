import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Location")
export class Location {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: "float" })
	lat: number;

	@Column({ type: "float" })
	long: number;

	@Column({ type: "timestamptz" })
	date: Date;
	
	@Column()
	user_id: number;
}