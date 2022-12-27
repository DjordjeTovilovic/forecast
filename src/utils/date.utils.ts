export function convertToTimestamp(isoDate: string): number {
  const date = new Date(isoDate)
  const timestamp = date.getTime() / 1000
  return timestamp
}
