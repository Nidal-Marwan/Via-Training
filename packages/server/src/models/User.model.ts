import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location.model";

@Entity("User")
export class User {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ unique: true })
		email: string;

	@Column()
		username: string;

	@Column({ unique: true })
		phone: string;

	@Column()
		password: string;

	//@OneToMany(() => Location, location => location.user)
	//	locations: Location[];
	
}
