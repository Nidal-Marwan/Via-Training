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
	lat: number;
	lng: number;
}

const getBounds = (locations: Position[], center: Position) => {
	let north = center.lat;
	let south = center.lat;
	let east = center.lng;
	let west = center.lng;

	const markers = [...locations, center];
	markers.forEach((marker) => {
		north = Math.max(marker.lat, north);
		south = Math.min(marker.lat, south);
		east = Math.max(marker.lng, east);
		west = Math.min(marker.lng, west);
	});

	return { sw: { lat: south, lng: west }, ne: { lat: north, lng: east } };
};

const setBounds = (map: google.maps.Map | null, locationMarkers: Position[], center: Position) => {
	if (locationMarkers.length !== 0) {
		const locationBounds = getBounds(locationMarkers, center);
		const bounds = new window.google.maps.LatLngBounds(locationBounds.sw, locationBounds.ne);
		map?.fitBounds(bounds);
	}
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
	const [loadMap, setLoadMap] = useState(false);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		setMap(map);
		setBounds(map, locationMarkers, position);
		map.setCenter(position);
	}, [locationMarkers, position]);

	useEffect(() => {
		if (isLoaded) {
			setBounds(map, locationMarkers, position);
		}
	}, [locationMarkers, position, isLoaded, map]);

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

	return isLoaded && !openModal && loadMap ? (
		<GoogleMap
			mapContainerStyle={{ width: "100%", height: "90vh" }}
			zoom={8}
			onLoad={onLoad}
		>
			<Marker position={position} />
			<DriversMarkers drivers={driverLocationData} />
		</GoogleMap>

	) : (
		<><LiveMapModal open={openModal} setOpen={setOpenModal} setPosition={setPosition} setLoadMap={setLoadMap} /></>
	);
};