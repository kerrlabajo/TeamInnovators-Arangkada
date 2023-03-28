export type Account = {
  accountId: number,
  firstname: string,
  middlename: string,
  lastname: string,
  birthdate: string,
  age: number,
  contactNumber: string,
  address: string,
  gender: string,
  username: string,
  password: string,
  accountType: string,
}

export type Operator = {
  operatorId: number,
  businessName: string,
  permitNumber: string,
  account: Account,
}

export type Driver = {
  driverId: number,
  licenseNumber: string,
  licenseCode: string,
  account: Account,
}

export type Vehicle = {
  vehicleId: number,
  plateNumber: string,
  route: string,
  vehicleType: string,
  makeModel: string,
  vin: number,
  orStatus: string,
  vehicleCondition: string,
  rentalFee: number,
  operator: Operator,
  isDeleted?: boolean,
  rented?: boolean,
  deletionReason?:String,
}

export type Rental = {
  rentalId: number,
  startDate: string,
  endDate: string,
  status: string,
  current: boolean,
  vehicle: Vehicle,
  driver: Driver,
  paid: boolean,
}

export type PostRental = {
  startDate: string,
  endDate: string,
  vehicle: { vehicleId: number }
  driver: { driverId: number }
}

export type PutRental = {
  startDate: string,
  endDate: string,
  status: string,
  current: boolean,
  paid: boolean,
}

export type Payment = {
  paymentId: number,
  amount: number,
  datePaid: string,
  rental: Rental
  collected: boolean
}

export type PutPayment = {
  amount: number
}

export type PutCollected = {
  collected: boolean
}