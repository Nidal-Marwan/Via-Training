import { Request, Response } from "express";
import * as service from '../../service/location/location-service';

export const getLocations = async (req: Request, res: Response) => {
  const locations = await service.fetchUserLocations(req.body.id);
  return res.send(locations);
};

export const postLocation = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const lat: number = req.body.lat;
  const long: number = req.body.long;
  const date: Date = req.body.date;
  const userId: number = req.body.userId;

  if (!name || !lat || !long || !date) {
    return res.send({ error: "Invalid input" });
  }

  const data = {
    name,
    lat,
    long,
    date,
    userId
  };

  const response = await service.addLocation(data);
  return res.send(response);
};
