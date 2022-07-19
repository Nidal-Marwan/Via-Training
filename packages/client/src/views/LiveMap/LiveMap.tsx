import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { DriversMarkers } from "../../common/components/DriversMarkers/DriversMarkers";
import { useGetDrivers } from "../../common/hooks/useGetDrivers.hook";
import { userSelector } from "../../redux/Actions/User/user.selector";

export const LiveMap:React.FC = ()=>{
	const userInfo = useSelector(userSelector);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "",
	});
	const {driverLocationData,setDriverLocationData} = useGetDrivers(userInfo.id);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const position= {lat: 32.03784800786203, lng: 54.29676344255572}; 
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new window.google.maps.LatLngBounds(position);
			map.fitBounds(bounds);
			setMap(map);
		},
		[position]
	);
	setInterval(()=>{
		const newLocations = driverLocationData?.map((location:any)=>{
			const obj = Object.assign({}, location);
			if((obj[0].lat < 85 || obj[0].lat > -85) && (obj[0].long <= 175 || obj[0].long >= -175) ){
				obj[0].lat = obj[0].lat+0.1;
				obj[0].long = obj[0].long+0.1;
			}
			return obj;
		});
		setDriverLocationData(newLocations);
	},2000);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{width:"100%",height:"90vh"}}
			zoom={13}
			onLoad={onLoad}
			center={position}
		>
			<DriversMarkers drivers={driverLocationData}/>
		</GoogleMap>

	) : (
		<></>
	);
};