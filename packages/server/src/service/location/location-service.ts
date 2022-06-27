import { Request } from "express";
import { LocationData } from "../../controllers/locations/Location";
import { Location } from "../../models/Location.model";
import { AppDataSource } from "../../utils/data-source";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

const locationRepository = AppDataSource.getRepository(Location);

export const fetchUserLocations = async (req: Request, data: any) => {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(
			authorization,
			`${process.env.ACCESS_TOKEN_SECRET}`
		);
		if (decoded) {
			const currentUserLocations = await locationRepository.find({
				where: { userId: data.userId },
			});
			if (currentUserLocations.length === 0) {
				return { status: 204, message: "No favorite locations for user" };
			}
			return { status: 201, message: "Locations fetched", currentUserLocations };
		} else {
			return { status: 401, message: "unauthorized" };
		}
	}
	return { error: "Token not sent with headers" };
};

export const addLocation = async (req: Request, data: LocationData) => {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(
			authorization,
			`${process.env.ACCESS_TOKEN_SECRET}`
		);
		if (decoded) {
			try {
				console.log(data);
				await locationRepository.save(data);
				return { status: 201, message: "Location added successfully" };
			} catch (err) {
				return { error: err };
			}
		} else {
			return { status: 401, message: "unauthorized" };
		}
	}
	return { error: "Token not sent with headers" };
};

export const deleteLocation = async (req: Request, data: any) => {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(
			authorization,
			`${process.env.ACCESS_TOKEN_SECRET}`
		);
		if (decoded) {
			try {
				await locationRepository.delete(data);
				return { status: 201, message: "Location deleted successfully" };
			} catch (err) {
				return { error: err };
			}
		}
	}
	return { error: "Token not sent with headers" };
};

export const editLocation = async (req: Request, data: any) => {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(
			authorization,
			`${process.env.ACCESS_TOKEN_SECRET}`
		);
		if (decoded) {
			try {
				await locationRepository.save({
					...data
				});
				return { status: 201, message: "Location edited successfully" };
			} catch (err) {
				return { error: err };
			}
		}
	}
	return { error: "Token not sent with headers" };
};