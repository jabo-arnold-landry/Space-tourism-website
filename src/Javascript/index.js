const navLinkSection = document.querySelector("#nav-links");

const linkList = [
  { link: "00 home", url: "/" },
  { link: "01 destination", url: "/src/pages/crew-commander.html" },
  { link: "02 crew", url: "/src/pages/destination-europa.html" },
  { link: "03 technology", url: "technology-capsule.html" },
];

navLinkSection.textContent = "";
linkList.forEach((links) => {
  const { link, url } = links;
  navLinkSection.innerHTML += `<a
                                    href=${url}
                                    class="uppercase font-extralight text-sm flex gap-2 relative py-2 group"
                                    >
                                    <span>${link.substring(0, 3)}</span> 
                                    ${link.substring(3)}
                                    <span
                                        class="absolute top-14 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                                    >
                                    </span>
                                </a>`;
});

async function fetchingFileData() {
  const gettingFile = await fetch("/data.json");
  const dataFromFile = await gettingFile.json();
  return dataFromFile;
}
const dataSet = await fetchingFileData();

function itemdINdex(itemName) {
  const destinationData = localStorage.getItem(itemName);
  //get current index to display last visited page in localstorage
  return destinationData ? JSON.parse(destinationData)["index"] : 0;
}

function triggerClickedBtn(element, btn, cb) {
  let btns = element.getElementsByTagName("button");
  const arr = [...btns];
  const index = arr.findIndex((node) => node === btn);
  cb(dataSet, index);
}

function highlightingClickedBtn(element, index) {
  const btns = element.querySelectorAll("button");

  btns.forEach((btn) => btn.classList.remove("bg-white", "text-gray-600"));

  btns[index].classList.add("bg-white", "text-gray-600");
}

export { dataSet, itemdINdex, triggerClickedBtn, highlightingClickedBtn };
