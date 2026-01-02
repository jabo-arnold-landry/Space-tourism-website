export default function saveDataToBrowserMemory(itemName,itemData, index) {
  return localStorage.setItem(
    itemName,
    JSON.stringify({ itemData, index })
  );
}
