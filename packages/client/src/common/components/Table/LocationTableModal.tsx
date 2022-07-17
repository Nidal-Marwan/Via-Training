import { Typography, TextField } from "@mui/material";
import { GridBox, GridItem } from "../Modal/LocationModel/LocationModal.styles";

interface LocationProps {
	locationName?: string;
	lat: number | undefined;
	lng: number | undefined;
	setLocationName: (name: string) => void;
}

export const LocationTableModal = ({ lat, lng, setLocationName, locationName }: LocationProps) => {
	return (
		<GridBox>
			<GridItem>
				<Typography>Name</Typography>
			</GridItem>
			<GridItem>
				<Typography>Latitude</Typography>
			</GridItem>
			<GridItem>
				<Typography>Longitude</Typography>
			</GridItem>
						
						
			<GridItem>
				<TextField
					onChange={(e) => {setLocationName(e.target.value);}}
					autoFocus
					variant="standard"
					defaultValue={locationName}
				/>
			</GridItem>
			<GridItem>
				<TextField
					value={lat}
					variant="standard"
					contentEditable={false}
				/>
			</GridItem>
			<GridItem>
				<TextField
					value={lng}
					variant="standard"
					contentEditable={false}
				/>
			</GridItem>
		</GridBox>
	);
};
export default LocationTableModal;
