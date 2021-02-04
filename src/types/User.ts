export class User {
  id: string;
  username: string;
  password: string; // make sure to encrypt
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
  accountLevel: number;
  purchases: PurchaseTicket[]
  sales: SaleTicket[];
  reviewsGiven: Review[]; 
  reviewsRecieved: Review[];
}

interface SaleType {}

export class Item {
  name: string;
  images: Link[]; // probably should be list of strings
  description: string;
  saleType: SaleType; // enumeration type later
  createdAt: Date;
  updatedAt: Date;
  bids: 
}

export class Review {}
export class PurchaseTicket {}
export class SaleTicket {}