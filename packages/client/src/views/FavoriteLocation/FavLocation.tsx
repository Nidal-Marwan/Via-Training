import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { trainingClient } from "../../common/api/trainingClient";
import { useMe } from "../../common/hooks/useMe.hook";

interface LocationsData {
	name: string;
	id: number;
	lat: number;
	long: number;
	date: Date;
	user_id: number;
}

interface FetchLocationsResponse {
	status: number;
	message: string;
	currentUserLocations: any[];
}
interface DefaultResponse {
	status: number;
	message: string;
}


export const FavLocation: React.FC = () => {
	const { userInfo } = useMe();

	const userId = userInfo?.user.userInfo.id;

	const dummyData = { name: "Add Test", lat: 35.5, long: 35.5, userId: userId, date: new Date() };
	const editedDummyData = { name: "Edited Test", lat: 1, long: 1, userId: userId, date: new Date() };

	const [locations, setLocations] = useState<LocationsData[]>([]);


	const getLocations = async (id: any) => {
		if (id === undefined) {
			return;
		}
		const token = window.localStorage.getItem('access_token');
		const response = await trainingClient.get<FetchLocationsResponse>(`/locations/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (response.data.status === 201)
			setLocations(response.data.currentUserLocations);
		if (response.data.status === 204)
			setLocations([]);
	};

	const addLocation = async (values: any) => {
		const token = window.localStorage.getItem('access_token');
		const response = await trainingClient.post<DefaultResponse>("/locations", values, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		//console.log(response.data);
	};
	const deleteLocation = async (id: number) => {
		const token = window.localStorage.getItem('access_token');
		const response = await trainingClient.delete<DefaultResponse>(`/locations/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		//console.log(response.data);
	};

	const editLocation = async (values: any) => {
		const token = window.localStorage.getItem('access_token');
		const response = await trainingClient.put<DefaultResponse>("/locations", values, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		//console.log(response.data);
	};

	const addHandleClick = async () => {
		await addLocation(dummyData);
		await getLocations(userId);
	};

	const deleteHandleClick = async (id: number) => {
		await deleteLocation(id);
		await getLocations(userId);
	};
	const editHandleClick = async (id: number, values: any) => {
		await editLocation({ id: id, ...values });
		await getLocations(userId);
	};
	useEffect(() => {
		getLocations(userId);
	}, [userId]);

	return (<>
		<p>Welcome {userInfo?.user.userInfo.email}</p>
		{locations.length === 0 && <p>No rows </p>}
		{locations.map((location) => (
			<div key={location.id}>
				<span>{location.name}</span>
				<Button onClick={() => deleteHandleClick(location.id)}>Delete</Button>
				<Button onClick={() => editHandleClick(location.id, editedDummyData)}>Edit</Button>
			</div>
		))}
		<Button onClick={addHandleClick}> Add location </Button>
	</>);
};
