import { Request } from "express";
import { LocationData } from "../../controllers/locations/Location";
import { Location } from "../../models/Location.model";
import { AppDataSource } from "../../utils/data-source";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import logger from "../../utils/logger";

const locationRepository = AppDataSource.getRepository(Location);

export const fetchUserLocations = async (id: number) => {
	const currentUserLocations = await locationRepository.find({
		where: { user_id: id },
	});
	if (currentUserLocations.length === 0) {
		return { status: 204, message: "No favorite locations for user" };
	} else {
		return { currentUserLocations };
	}
};

export const addLocation = async (data: LocationData) => {
	try {
		await locationRepository.save(data);
		return { status: 201, message: "Location added successfully" };
	} catch (err) {
		return { error: err };
	}
};