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
	const { name, phone, carModel, licensePlate, locationId, userId } = req.body;
	const error = {};
	if (!name) {
		error["nameError"] = "Name is required";
	}
	if (!phone) {
		error["phoneError"] = "phone is required";
	}
	if (!carModel) {
		error["carModelError"] = "Car-Model is required";
	}
	if (!licensePlate) {
		error["licenseError"] = "License-Plate is required";
	}
	if (!locationId) {
		error["locationIdError"] = "Location-Id is required";
	}
	if (!userId) {
		error["userIdError"] = "UserId is required";
	}
	if (Object.keys(error).length != 0) {
		return res.send({ status: 400, error });
	}
	const data = {
		name,
		phone,
		carModel,
		licensePlate,
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
	const { name, lat, lng, phone, carModel, licensePlate, date, locationName, locationId, userId } = req.body;
	const error = {};
	if (!name) {
		error["nameError"] = "Name is required";
	}
	if (!phone) {
		error["phoneError"] = "phone is required";
	}
	if (!carModel) {
		error["carModelError"] = "Car-Model is required";
	}
	if (!licensePlate) {
		error["licenseError"] = "License-Plate is required";
	}
	if (!locationId) {
		error["locationIdError"] = "Location-Id is required";
	}
	if (!userId) {
		error["userIdError"] = "UserId is required";
	}
	if (Object.keys(error).length != 0) {
		return res.send({ status: 400, error });
	}
	const data = {
		name,
		lat,
		lng,
		phone,
		carModel,
		licensePlate,
		date,
		locationName,
		locationId,
		userId
	};
	const response = await service.editDriver(req, data);
	return res.send(response);
};