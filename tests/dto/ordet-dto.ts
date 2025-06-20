export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string

  constructor(
    customerName: string,
    courierId: number,
    status: string,
    customerPhone: string,
    comment: string,
  ) {
    this.comment = comment
    this.status = status
    this.courierId = courierId
    this.status = status
    this.customerName = customerName
    this.customerPhone = customerPhone
  }
}
