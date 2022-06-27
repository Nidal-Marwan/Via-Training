import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model";

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

	//@ManyToOne(() => User, user => user.locations)
	//user: User;
	@Column()
	userId: number;
}