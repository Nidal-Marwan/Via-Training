import { Request, response, Response } from "express";
import * as service from "../../service/location/location-service";

export const getLocations = async (req: Request, res: Response) => {
	const userid: number = req.body.id;
	if (!userid) {
		return res.send({ error: "Invalid input" });
	}
	const response = await service.fetchUserLocations(req, { userid });
	return res.send(response);
};

export const postLocation = async (req: Request, res: Response) => {
	const name: string = req.body.name;
	const lat: number = req.body.lat;
	const long: number = req.body.long;
	const date: Date = req.body.date;
	const userid: number = req.body.userid;

	if (!name || !lat || !long || !date) {
		return res.send({ error: "Invalid input" });
	}

	const data = {
		name,
		lat,
		long,
		date,
		userid
	};

	const response = await service.addLocation(req, data);
	return res.send(response);
};

export const deleteLocation = async (req: Request, res: Response) => {
	const userid: number = req.body.id;
	if (!userid) {
		return res.send({ error: "Invalid input" });
	}
	const response = await service.deleteLocation(req, userid);
	return res.send(response);
};

export const putLocation = async (req: Request, res: Response) => {
	const id: number = req.body.id;
	const name: string = req.body.name;
	const lat: number = req.body.lat;
	const long: number = req.body.long;
	const date: Date = req.body.date;
	const userid: number = req.body.userid;

	if (!id || !name || !lat || !long || !date || !userid) {
		return res.send({ error: "Invalid input" });
	}
	
	const data = {
		id,
		name,
		lat,
		long,
		date,
		userid
	};
	const response = await service.editLocation(req, data);
	return res.send(response);
};