import { Request } from "express";
import { DriverData } from "../../controllers/driver/Driver";
import { Driver } from "../../models/Driver.model";
import { Location } from "../../models/Location.model";
import { AppDataSource } from "../../utils/data-source";

const driverRepository = AppDataSource.getRepository(Driver);
const locationRepo = AppDataSource.getRepository(Location);

export const getUserDrivers = async (req: Request, userId: string) => {
	try {
		const currentUserDrivers = await driverRepository.find({
			where: { userId: +userId },
		});
		if (currentUserDrivers.length === 0) {
			return { status: 204, message: "No drivers for user" };
		}
		else {
			const locations = currentUserDrivers.map(async driver => {
				return await locationRepo.find({ where: { id: driver.locationId } });

			});
			const data = await Promise.all(locations);
			const driversWithLocations = { driversInfo: currentUserDrivers, locationsInfo: data };
			return { status: 200, message: "Drivers fetched", drivers: driversWithLocations };
		}
	} catch (err) {
		return { status: 400, error: "invalid request" };
	}
};

export const addDriver = async (req: Request, data: DriverData) => {
	try {
		const existingDriver = await driverRepository.findOne({ where: { phone: data.phone } });
		if (existingDriver) {
			return { status: 409, message: "Phone already exist" };
		}
		await driverRepository.save(data);
		return { status: 200, message: "Driver added successfully" };
	} catch (err) {
		return { error: err };
	}
};

export const deleteDriver = async (req: Request, userId: number) => {
	try {
		await driverRepository.delete(userId);
		return { status: 200, message: "Driver deleted successfully" };
	} catch (err) {
		return { error: err };
	}
};

export const editDriver = async (req: Request, data: any) => {
	try {
		const editedDriver = await driverRepository.findOne({ where: { phone: req.body.phone } });
		if (editedDriver) {
			await driverRepository.update(editedDriver.id, data);
			return { status: 200, message: "Driver edited successfully" };
		} else {
			return { status: 200, message: "Driver not found" };
		}
	} catch (err) {
		return { error: err };
	}
};