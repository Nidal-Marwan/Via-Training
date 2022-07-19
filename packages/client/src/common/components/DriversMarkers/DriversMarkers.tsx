import { Marker } from "@react-google-maps/api";
import { Fragment } from "react";
import { DriversData } from "../../hooks/useGetDrivers.hook";

interface DriversMarkersProps{
    drivers?:DriversData[]
}
export const DriversMarkers:React.FC<DriversMarkersProps> = ({drivers}:DriversMarkersProps)=>{
	return (
		<Fragment>
			{drivers?.map((location:any)=>{
				return <Marker key={location[0].id} position={{lat:location[0].lat,lng:location[0].long}}/>;
			})}
		</Fragment>
	);
};