import moment from "moment";

export function returnDate(fecha) {
  return moment(fecha).format('D-MM-YYYY')
}

export const minDate = moment().add(1, "day").format('YYYY-MM-DD')