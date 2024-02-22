export default interface Location {
  id?: Number;
  created_at: Date;
  owner: Number;
  area: Number;
  address: string;
  capacity: Number;
  price: Number;
  available: boolean;
}
