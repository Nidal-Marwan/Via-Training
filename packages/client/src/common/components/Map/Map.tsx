import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";
interface MapProps {
	position: {
		lat: number,
		lng: number
	},
	modalCallback: (lat: number, lng: number) => void
}

export const Map = ({ position, modalCallback }: MapProps) => {
	const [markerPosition, setMarkerPostion] = useState(position);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "",
	});
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new window.google.maps.LatLngBounds(position);
			map.fitBounds(bounds);
			setMap(map);
		},
		[position]
	);
	const handleNewPosition = (event?: google.maps.LatLngLiteral) => {
		if (event) {
			const lat = event.lat;
			const lng = event.lng;
			modalCallback(lat, lng);
			setMarkerPostion({ lat: +lat, lng: +lng });
		}
	};
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{ width: "700px", height: "700px" }}
			zoom={5}
			onLoad={onLoad}
			center={position}
			onClick={(e) => handleNewPosition(e.latLng?.toJSON())}
		>
			<Marker position={markerPosition} />
		</GoogleMap>

	) : (
		<></>
	);
};
