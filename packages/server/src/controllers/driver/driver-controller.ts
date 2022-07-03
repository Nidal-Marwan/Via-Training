import { Request, Response } from "express";
import * as service from "../../service/driver/driver-service";

export const getDrivers = async (req: Request, res: Response) => {
	const userId = req.params.id;
	if (userId) {
		const response = await service.getUserDrivers(req, userId);
		return res.send(response);
	} else {
		return res.send({ error: "Invalid input" });
	}
};
export const postDriver = async (req: Request, res: Response) => {
	const name: string = req.body.name;
	let lat: number = req.body.lat;
	let lng: number = req.body.lng;
	const phone: string = req.body.phone;
	const carModel: string = req.body.carModel;
	const licensePlate: string = req.body.licensePlate;
	const date: Date = req.body.date;
	const locationId: number = req.body.locationId;
	const userId: number = req.body.userId;

	if (!name || !phone || !carModel || !licensePlate || !date || !locationId || !userId) {
		return res.send({ error: "Invalid input" });
	}
	if (!lat || !lng) {
		lat = null;
		lng = null;
	}
	const data = {
		name,
		lat,
		lng,
		phone,
		carModel,
		licensePlate,
		date,
		locationId,
		userId
	};

	const response = await service.addDriver(req, data);
	return res.send(response);
};
export const deleteDriver = async (req: Request, res: Response) => {
	const userId: string = req.params.id;
	if (!userId) {
		return res.send({ error: "Invalid input" });
	}
	const response = await service.deleteDriver(req, parseInt(userId));
	return res.send(response);
};
export const putDriver = async (req: Request, res: Response) => {
	const name: string = req.body.name;
	let lat: number = req.body.lat;
	let lng: number = req.body.lng;
	const phone: number = req.body.phone;
	const carModel: string = req.body.carModel;
	const licensePlate: string = req.body.licensePlate;
	const date: Date = req.body.date;
	const locationId: number = req.body.locationId;
	const userId: number = req.body.userId;

	if (!name || !phone || !carModel || !licensePlate || !date || !locationId || !userId) {
		return res.send({ error: "Invalid input" });
	}
	if (!lat || !lng) {
		lat = 0;
		lng = 0;
	}
	const data = {
		name,
		lat,
		lng,
		phone,
		carModel,
		licensePlate,
		date,
		locationId,
		userId
	};
	const response = await service.editDriver(req, data);
	return res.send(response);
};