import { useEffect, useState } from "react";
import { trainingClient } from "../api/trainingClient";

interface LocationResponse {
	status: number,
	data: LocationsData[]
}
interface LocationsData {
	data: {
		id:number;
		name: string;
		lat: number;
		long: number;
		date: Date;
		userId: number;
	}
}


export const useGetLocations = (id?: number) => {
	console.log("id is ", id);
	const [rowData, setRowData] = useState<LocationsData[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		const getLocations = async () => {
			try {
				if (!id) {
					return;
				}
				setIsLoading(true);
				const locations = await trainingClient.get<LocationResponse>(`locations/${id}`);
				if (locations.data.status === 200) {
					setRowData(locations.data.data);
					setIsLoading(false);
				}
			} catch (e: any) {
				setError(e);
			}
		};
		getLocations();
	}, [id]);

	return { rowData, isLoading, error,setRowData };
};