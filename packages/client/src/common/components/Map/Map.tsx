import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Button, Divider, Modal, styled, TextField, Typography } from "@mui/material";
import { ActionsBox, MapBox, ModalBox } from "./Map.styles";

const center = {
	"lat": 19.7683,
	"lng": 20.2137
};
const zoomLevel = 5;


const containerStyle = {
	width: "100%",
	height: "100%"
};

//this is only for testing purposes
const TestModal = (props: any) => {
	return (
		<div>
			<Modal
				open={props.isOpen}
				onClose={props.handleOnCancel}
				aria-labelledby='modal-modal-title'
			>
				<ModalBox>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Add Location
					</Typography>
					<Divider />
					<TextField value={props.lat}/>
					<TextField value={props.lng}/>
					<ActionsBox>
						<Button variant='contained' onClick={props.handleOnAccept}>
							Save
						</Button>
						<Button variant='outlined' onClick={props.handleOnCancel}>
							Cancel
						</Button>
					</ActionsBox>
				</ModalBox>
			</Modal>
		</div>
	);
};

const CustomMap = () => {
	const [isMapOpen, setIsMapOpen] = useState(false);
	const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
	const [lat, setLat] = useState<number | undefined>(0);
	const [lng, setLng] = useState<number | undefined>(0);
	
	const handleOnCancel = () => {
		setIsAddLocationOpen(false);
	};
	const handleOnAccept = () => {
		const position = {lat, lng};
		console.log("position: ", {position});
	};

	const handleCloseMap = () => {
		setIsMapOpen(false);
	};
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "",
	});

	const [map, setMap] = useState(null);

	const onLoad = React.useCallback(function callback(map: any) {
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null);
	}, []);
    
	return ( 
		<>
			{isLoaded ? (
				<Modal
					open={true}
					onClose={handleCloseMap}
				>
					<MapBox>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={zoomLevel}
							onLoad={onLoad}
							onUnmount={onUnmount}
							onClick={(e)=>{
								setIsAddLocationOpen(true);
								setLat(e.latLng?.lat());
								setLng(e.latLng?.lng());
							}}
						>
							<></>
						</GoogleMap>
						<TestModal isOpen={isAddLocationOpen}
							handleOnAccept={handleOnAccept}
							handleOnCancel={handleOnCancel}
							lat={lat}
							lng={lng}
						/>
					</MapBox>
				</Modal>
			) : (
				<></>
			)}
		</>
	);
};

export default CustomMap;
