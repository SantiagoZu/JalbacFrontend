import moment from "moment";

export function returnDate(fecha) {
  
  return moment(fecha).format('D-MM-YYYY')
}