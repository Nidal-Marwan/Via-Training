import { Request, Response } from "express";
import * as service from "../../service/driver/driver-service";

export const getDrivers = async (req: Request, res: Response) => {
	const userId = req.params.id;
	if (!userId) {
		return res.send({ error: "Invalid input" });
	} else {
		const response = await service.getUserDrivers(req, userId);
		return res.send(response);
	}
};
export const postDriver = async (req: Request, res: Response) => {
	const { name, lat, lng, phone, carModel, licensePlate, date, locationId, userId } = req.body;
	if (!name) {
		return res.send({ error: "Name is required" });
	}
	if (!phone) {
		return res.send({ error: "Phone is required" });
	}
	if (!carModel) {
		return res.send({ error: "Car-Model is required" });
	}
	if (!licensePlate) {
		return res.send({ error: "License-Plate is required" });
	}
	if (!date) {
		return res.send({ error: "Date is required" });
	}
	if (!locationId) {
		return res.send({ error: "Location is required" });
	}
	if (!userId) {
		return res.send({ error: "User-Id is required" });
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
	const { name, lat, lng, phone, carModel, licensePlate, date, locationId, userId } = req.body;
	if (!name) {
		return res.send({ error: "Name is required" });
	}
	if (!phone) {
		return res.send({ error: "Phone is required" });
	}
	if (!carModel) {
		return res.send({ error: "Car-Model is required" });
	}
	if (!licensePlate) {
		return res.send({ error: "License-Plate is required" });
	}
	if (!date) {
		return res.send({ error: "Date is required" });
	}
	if (!locationId) {
		return res.send({ error: "Location is required" });
	}
	if (!userId) {
		return res.send({ error: "User-Id is required" });
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