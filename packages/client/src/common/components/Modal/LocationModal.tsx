import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { styled } from '@mui/system';
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import {Map} from '../Map/Map';
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { trainingClient } from "../../api/trainingClient";
import { useMe } from "../../hooks/useMe.hook";
import { Data } from "@react-google-maps/api";
import { TextInput } from "../TextInput/TextInput";

const ModalBox = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width:800,
    height:'100%',
	backgroundColor: '#fff',
	boder: '2px solid #000',
	boxShadow: '24',
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: '2px',
});
const ActionsBox = styled(Box)({
	marginTop: 30,
	display: 'flex',
	justifyContent: 'center',
	gap: '10px',
	'& > *': {
		flexBasis: 100,
	},
});
const MapBox = styled(Box)({
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'column',
   marginTop:'10px'

})

interface LocationProps{
    position:{
        lat:number,
        lng:number
    },
    data?:{
        id:number,
        name:string,
        lat:number,
        long:number
    }
}

export const LocationModal =({position,data}:LocationProps)=>{
    const navigate = useNavigate()
    const {userInfo} = useMe();
    const token = window.localStorage.getItem('access_token');
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(true);
    const [locationInfo,setLocationInfo] = useState({lat:data?.lat,lng:data?.long});
    const [locationName,setLocationName] = useState(data?.name);
    const row = [{
        id: data?.id,
        name: data?.name,
        lat: locationInfo.lat,
        long: locationInfo.lng,
       
    }];
    const column = [	{ field: "name", headerName: "Name",  headerAlign: "center", width: 150,align:"center",renderCell:(params:any)=>(
       
        <TextField
        onChange={(e)=>setLocationName(e.target.value)}
        autoFocus
        defaultValue={params.row.name}
        variant="standard"
      />
    
    )
    ,
},
{ field: "lat", headerName: "Latitude",headerAlign: "center", type: "number", width: 100 , align:"center"},
{ field: "long", headerName: "Longitude",headerAlign: "center", type: "number", width: 100, align:"center" },]
	
	const handleClose = () => {
		setShowModal(false);
	};
	const onAccept = async() => {
        const payload = {id: data?.id,name:locationName,lat:locationInfo.lat,long:locationInfo.lng}
        const response = await trainingClient.put('/locations',payload,{
            headers:{ Authorization: `Bearer ${token}`}
        })
        if(response.data.status===200){
		handleClose();
        await trainingClient.get('/locations')
        }
	};
	const onCancel = () => {
		handleClose();
        
	};

    const handleCallback = (lat:number,lng:number) =>{
        console.log(lat,lng)
        console.log(locationInfo)
        setLocationInfo({lat,lng})
    }

    console.log(locationName)
	return 	<Modal
	
		open={showModal}
		onAccept={onAccept}
		onCancel={onCancel}
	> 
                 <ModalBox>
					<Typography sx={{textAlign:'center'}} id='modal-modal-title' variant='h6' component='h2'>
                    {t("modal.location.message")}
					</Typography>
					<Divider />
                    <MapBox>
                    <Map modalCallback={handleCallback} position={position}/>
                    <Table height={170} width={400} margin={15} columns={column} rows={row} />
                    </MapBox>
                  
					<ActionsBox>
						<Button variant='contained' onClick={onAccept}>
                        {t("modal.loaction.accept")}
						</Button>
						<Button variant='outlined' onClick={onCancel}>
                        {t("modal.location.decline")}
						</Button>
					</ActionsBox>
				</ModalBox>
    </Modal>
};
