import { Request, Response } from "express";
import * as service from "../../service/location/location-service";

export const getLocations = async (req: Request, res: Response) => {
	const userId: string = req.params.id;
	if (!userId) {
		return res.send({ error: "Invalid input" });
	}
	const response = await service.fetchUserLocations(req, { userId });
	return res.send(response);
};

export const postLocation = async (req: Request, res: Response) => {
	const name: string = req.body.name;
	const lat: number = req.body.lat;
	const long: number = req.body.long;
	const date: Date = req.body.date;
	const userId: number = req.body.userId;

	if (!name || !lat || !long || !date) {
		return res.send({ error: "Invalid input" });
	}

	const data = {
		name,
		lat,
		long,
		date,
		userId
	};

	const response = await service.addLocation(req, data);
	return res.send(response);
};

export const deleteLocation = async (req: Request, res: Response) => {
	const userId: string = req.params.id;
	if (!userId) {
		return res.send({ error: "Invalid input" });
	}
	const response = await service.deleteLocation(req, userId);
	return res.send(response);
};

export const putLocation = async (req: Request, res: Response) => {
	const id: number = req.body.id;
	const name: string = req.body.name;
	const lat: number = req.body.lat;
	const long: number = req.body.long;
	const date: Date = req.body.date;
	const userId: number = req.body.userId;

	if (!id || !name || !lat || !long || !date || !userId) {
		return res.send({ error: "Invalid input" });
	}

	const data = {
		id,
		name,
		lat,
		long,
		date,
		userId
	};
	const response = await service.editLocation(req, data);
	return res.send(response);
};