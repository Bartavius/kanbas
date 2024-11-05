export default function formatDate(
    {date} :
    {date: Date}
): string {
    let month = date.toLocaleString('default', { month: 'long' })
    let day = date.getDate();
    let hour = date.getHours();
    let pm = date.getHours() >= 12 ? "PM" : "AM";
    hour = hour % 12 === 0 ? 12 : hour % 12;
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${month.substring(0,3)} ${day} at ${hour}:${minutes}${pm}`
}