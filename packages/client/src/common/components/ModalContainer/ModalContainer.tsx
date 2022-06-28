import { LocationModal } from "../Modal/LocationModal";
import { LoginModal } from "../Modal/LoginModal";
interface ModalProps{
  page:string,
  position?:{
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

export const ModalContainer = ({page,position,data}:ModalProps) => {
	let content;
	if(page ==="login"){
		content = <LoginModal/>;
	} else if(page === 'location' && position){
    content = <LocationModal data={data} position={position}/>
  }
	return (
		<>
			{content}
		</>
	);
};
