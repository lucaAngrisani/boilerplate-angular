export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(data?: Partial<Address>) {
    this.street = data?.street ?? '';
    this.city   = data?.city   ?? '';
    this.state  = data?.state  ?? '';
    this.zip    = data?.zip    ?? '';
  }
}
