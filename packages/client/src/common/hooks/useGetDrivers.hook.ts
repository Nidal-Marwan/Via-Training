import { useEffect, useState } from "react";
import { trainingClient } from "../api/trainingClient";

interface DriverResponse {
	status: number,
	drivers: DriversData[]
}
export interface DriversData {
	data: {
        driversInfo:{
            id:number;
            name: string;
            phone: number;
            carModel: string;
            licensePlate: string;
            locationName: string;
            locationId: number;
            date: Date;
            userId: number;
        },
        locationsInfo:{
            id: number;
            name: string;
            lat: number;
            long: number;
            date: Date;  
        }
		
	}
}


export const useGetDrivers = (id?: number) => {
	const [rowData, setRowData] = useState<DriversData[]>();
	const [driverLocationData, setDriverLocationData] = useState<DriversData[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		const getDrivers = async () => {
			try {
				if (!id) {
					return;
				}
				setIsLoading(true);
				//fix any
				const drivers = await trainingClient.get<any>(`drivers/${id}`);
				if (drivers.status === 200) {
					setRowData(drivers.data.drivers.driversInfo);
					setDriverLocationData(drivers.data.drivers.locationsInfo);
					setIsLoading(false);
				}
			} catch (e: any) {
				setError(e);
			}
		};
		getDrivers();
	}, [id]);

	return { rowData, driverLocationData, setDriverLocationData, isLoading, error, setRowData };
};