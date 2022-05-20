export default async function getCoordinates(address: string) {
    console.log(address)
    const urlEncodedAddress = encodeURIComponent(address);
    console.log(urlEncodedAddress);
    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodedAddress}`);
    const result = await response.json();
    console.log(result);

    return result;
};