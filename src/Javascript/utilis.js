export default function saveDataToBrowserMemory(itemName, itemData, index) {
  return localStorage.setItem(itemName, JSON.stringify({ itemData, index }));
}

export function itemdINdex(itemName) {
  const destinationData = localStorage.getItem(itemName);
  //get current index to display last visited page in localstorage
  return destinationData ? JSON.parse(destinationData)["index"] : 0;
}
