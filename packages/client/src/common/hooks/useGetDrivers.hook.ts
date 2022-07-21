import { useEffect, useState } from "react";
import { trainingClient } from "../api/trainingClient";

interface DriverResponse {
	status: number,
	drivers: DriversData[];
}

export interface DriversInfo {
	id: number;
	name: string;
	phone: number;
	carModel: string;
	licensePlate: string;
	locationName: string;
	locationId: number;
	date: Date;
	userId: number;
}
export interface LocationInfo {
	id: number;
	name: string;
	lat: number;
	long: number;
	date: Date;
}
export interface DriversData {
	data: {
		driversInfo: DriversInfo,
		locationsInfo: LocationInfo;
	};
}
export interface LatLngData {
	lat: number,
	lng: number,
}

export const useGetDrivers = (id?: number) => {
	const [rowData, setRowData] = useState<DriversInfo[]>();
	const [driverLocationData, setDriverLocationData] = useState<LocationInfo[]>();
	const [locationMarkers, setLocationMarkers] = useState<LatLngData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const getDrivers = async () => {
			try {
				if (!id) {
					return;
				}
				const drivers = await trainingClient.get(`drivers/${id}`);
				if (drivers.status === 200) {
					const flattenedLocations = [...drivers.data.drivers.locationsInfo].flat();
					setRowData(drivers.data.drivers.driversInfo);
					setDriverLocationData(flattenedLocations);
					const locations: LatLngData[] = flattenedLocations.map((driver: LocationInfo) => {
						return { lat: driver.lat, lng: driver.long };
					});
					setLocationMarkers(locations);
				}
				setIsLoading(false);
			} catch (e: any) {
				setError(e);
			}
		};
		getDrivers();
	}, [id]);

	return { rowData, driverLocationData, setDriverLocationData, isLoading, error, setRowData, locationMarkers };
};