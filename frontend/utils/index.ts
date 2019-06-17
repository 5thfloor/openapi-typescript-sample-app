export function pad2(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

export function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = pad2(date.getMonth() + 1)
  const dd = pad2(date.getDate())
  return `${yyyy}-${mm}-${dd}`
}
