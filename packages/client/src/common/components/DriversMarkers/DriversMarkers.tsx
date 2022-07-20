import { Marker } from "@react-google-maps/api";
import { Fragment } from "react";
import { LocationInfo } from "../../hooks/useGetDrivers.hook";

interface DriversMarkersProps {
	drivers?: LocationInfo[];
}
export const DriversMarkers: React.FC<DriversMarkersProps> = ({ drivers }: DriversMarkersProps) => {
	return (
		<Fragment>
			{drivers?.map((location: LocationInfo) => {
				return <Marker key={location.id} position={{ lat: location.lat, lng: location.long }} icon={{ path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 7 }} />;
			})}
		</Fragment>
	);
};