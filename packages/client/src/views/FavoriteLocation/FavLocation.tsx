import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { trainingClient } from "../../common/api/trainingClient";
import { useMe } from "../../common/hooks/useMe.hook";


interface LocationsData {
  name: string;
  id: number;
  lat: number;
  long: number;
  date: Date;
  user_id: number;
}
export const FavLocation: React.FC = () => {
  // const { userInfo } = useMe();
  const userId = 2;
  // console.log(userId)
  const [locations, setLocations] = useState<LocationsData[]>([]);

  const getLocations = async (id: any) => {
    console.log(id)
    const response = await trainingClient.get(
      '/locations',
      id
    );
    setLocations(response.data.currentUserLocations);
  };

  useEffect(() => {
    getLocations(userId);
  }, [userId]);

  const addLocation = async (values: any) => {
    const response = await trainingClient.post("/locations/add", values);
  };
  const dummyData = { name: "Add Test", lat: 35.5, long: 35.5, userId: 1, date: new Date() };
  return (<>
    <Button onClick={() => addLocation(dummyData)}> Add location </Button>
    {/* <p>Welcome {userInfo?.user.userInfo.email}</p> */}
    {locations.map((location) => (
      <div>
        {location.name}
      </div>
    ))}
  </>);
};
