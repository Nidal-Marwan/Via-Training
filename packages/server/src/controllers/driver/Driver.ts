export interface DriverData {
  id?: number;
  name: string;
  lat: number | null;
  lng: number | null;
  phone: string;
  carModel: string;
  licensePlate: string;
  date: Date;
  locationId: number;
  userId: number;
}