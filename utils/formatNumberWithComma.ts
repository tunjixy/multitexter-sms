export default function (number: string | number) {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'
}
