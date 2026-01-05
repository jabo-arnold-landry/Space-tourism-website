const navLinkSection = document.querySelector("#nav-links");

const linkList = [
  { link: "00 home", url: "/" },
  { link: "01 destination", url: "/src/pages/destination-europa.html" },
  { link: "02 crew", url: "/src/pages/crew-commander.html" },
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

function highlightingCurrentLink(seletor, index) {
  const btns = document.querySelectorAll(seletor);

  // Get all the underline spans (the last span in each anchor)
  btns.forEach((btn) => {
    const spans = btn.querySelectorAll("span");
    const underlineSpan = spans[spans.length - 1]; // Get the last span (the underline)
    underlineSpan.classList.remove("scale-x-100");
    underlineSpan.classList.add("scale-x-0");
  });

  // Highlight the selected button's underline
  const selectedBtn = btns[index];
  const selectedSpans = selectedBtn.querySelectorAll("span");
  const selectedUnderlineSpan = selectedSpans[selectedSpans.length - 1];
  selectedUnderlineSpan.classList.remove("scale-x-0");
  selectedUnderlineSpan.classList.add("scale-x-100");
}

// Function to detect current page and highlight the appropriate link
function detectCurrentPage() {
  const currentPath = window.location.pathname;

  // Find matching index in linkList
  let currentIndex = 0; // Default to home

  linkList.forEach((item, index) => {
    // Normalize paths for comparison
    const itemUrl = item.url.startsWith("/") ? item.url : "/" + item.url;

    // Check if current path matches or includes the link URL
    if (
      currentPath === itemUrl ||
      (itemUrl !== "/" && currentPath.includes(itemUrl)) ||
      (currentPath === "/" && itemUrl === "/") ||
      (currentPath.endsWith("/index.html") && itemUrl === "/")
    ) {
      currentIndex = index;
    }

    // Also check for page type matches (crew, destination, technology)
    if (currentPath.includes("/crew-") && item.link.includes("crew")) {
      currentIndex = index;
    } else if (
      currentPath.includes("/destination-") &&
      item.link.includes("destination")
    ) {
      currentIndex = index;
    } else if (
      currentPath.includes("/technology-") &&
      item.link.includes("technology")
    ) {
      currentIndex = index;
    }
  });

  return currentIndex;
}

// Highlight based on current page
const currentPageIndex = detectCurrentPage();
highlightingCurrentLink("a", currentPageIndex);

async function fetchingFileData() {
  const gettingFile = await fetch("/data.json");
  const dataFromFile = await gettingFile.json();
  return dataFromFile;
}
const dataSet = await fetchingFileData();

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

export {
  dataSet,
  triggerClickedBtn,
  highlightingClickedBtn,
  highlightingCurrentLink,
};
