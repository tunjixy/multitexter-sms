export default function isNumber(event: KeyboardEvent) {
  if (!/^[0-9,\b]+$/.test(event.key) && event.key !== '.')
    return event.preventDefault()
}
