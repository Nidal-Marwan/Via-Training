import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DriversMarkers } from "../../common/components/DriversMarkers/DriversMarkers";
import { LiveMapModal } from "../../common/components/Modal/LiveMapModal/LiveMapModal";
import { LocationInfo, useGetDrivers } from "../../common/hooks/useGetDrivers.hook";
import { userSelector } from "../../redux/Actions/User/user.selector";

const generateRandomNum = () => {
	return (-0.001 + Math.random() * (0.001 - (-0.001)));
};

interface Position {
	lat: number,
	lng: number,
}

interface Bounds {
	sw: Position,
	ne: Position,
}

const getBounds = (markers: Position[]) => {
	let north = markers[0].lat;
	let south = markers[0].lat;
	let east = markers[0].lng;
	let west = markers[0].lng;

	markers.forEach((marker) => {
		north = Math.max(marker.lat, north);
		south = Math.min(marker.lat, south);
		east = Math.max(marker.lng, east);
		west = Math.min(marker.lng, west);
	});

	return { sw: { lat: south, lng: west }, ne: { lat: north, lng: east } };
};

export const LiveMap: React.FC = () => {
	const userInfo = useSelector(userSelector);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "",
	});
	const { driverLocationData, setDriverLocationData, isLoading, locationMarkers } = useGetDrivers(userInfo.id);
	const [openModal, setOpenModal] = useState(true);
	const [position, setPosition] = useState({ lat: 32.03784800786203, lng: 80.6 });
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		setMap(map);
		if (!isLoading && locationMarkers.length > 0) {
			const locationBounds = getBounds(locationMarkers);
			const bounds = new window.google.maps.LatLngBounds(locationBounds.sw, locationBounds.ne);
			map.fitBounds(bounds);
		}
	}, [isLoading]);

	useEffect(() => {
		setTimeout(() => {
			const newLocations = driverLocationData?.map((location: LocationInfo) => {
				if ((location.lat < 85 || location.lat > -85) && (location.long <= 175 || location.long >= -175)) {
					location.lat = location.lat + generateRandomNum();
					location.long = location.long + generateRandomNum();
				}
				return location;
			});
			setDriverLocationData(newLocations);
		}, 2000);
	}, [driverLocationData]);

	return isLoaded && !openModal ? (
		<GoogleMap
			mapContainerStyle={{ width: "100%", height: "90vh" }}
			zoom={7}
			onLoad={onLoad}
			center={position}
		>
			<Marker position={position} />
			<DriversMarkers drivers={driverLocationData} />
		</GoogleMap>

	) : (
		<><LiveMapModal open={openModal} setOpen={setOpenModal} setPosition={setPosition} /></>
	);
};