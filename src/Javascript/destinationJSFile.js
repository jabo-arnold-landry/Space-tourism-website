const destinationSwitcherBtns = document.querySelector("#destination-switcher");
const destinationDetailsSection = document.querySelector("#dest-details");
const imgDestination = document.querySelector("#dest-img");
const destinationList = ["moon", "mars", "europa", "titian"];

import { dataSet, highlightingCurrentLink } from "./index.js";
import { itemdINdex } from "./utilis.js";
import saveDataToBrowserMemory from "./utilis.js";

highlightingCurrentLink("a", 1);
function destinationSwitcherBtnsCreation() {
  destinationSwitcherBtns.textContent = "";
  const btnDocFragment = document.createDocumentFragment();

  destinationList.forEach((destination, index) => {
    const btn = document.createElement("button");

    btn.classList.add(
      "text-gray-400",
      "uppercase",
      "font-light",
      "text-sm",
      "cursor-pointer",
      "group",
      "relative"
    );
    btn.setAttribute("data-index", index);
    btn.innerHTML = `${destination}
                      <span
                        class="absolute top-6 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                      ></span>`;

    btnDocFragment.append(btn);
  });

  destinationSwitcherBtns.append(btnDocFragment);
}
destinationSwitcherBtnsCreation();

function displayDestanationDetails(dataSet, index) {
  const { destinations } = dataSet;
  const destanationData = destinations[index];

  highlightingCurrentBtn(index);
  saveDataToBrowserMemory("destination", destinations, index);

  destinationDetailsSection.innerHTML = "";
  const {
    name,
    images: { webp },
    description,
    distance,
    travel,
  } = destanationData;

  imgDestination.src = webp;
  destinationDetailsSection.innerHTML = `<div class="grid gap-5">
              <strong class="text-6xl font-extralight uppercase font-Bellefair text-center lg:text-left">${name}</strong>
              <p class="max-w-100 text-gray-400 pb-4 text-center lg:text-left font-Barlow-ital:">
               ${description}
              </p>
            </div>

            <div class="pt-4 flex justify-between px-4">
              <div>
                <p class="text-xs mb-2 text-gray-500 uppercase">
                  avg. distance
                </p>
                <p class="text-4xl text-gray-200 font-extralight font-Bellefair">${distance}</p>
              </div>

              <div>
                <p class="text-xs mb-2 text-gray-500 uppercase">
                  est. travel time
                </p>
                <p class="text-4xl text-gray-200 font-extralight font-Bellefair">${travel}</p>
              </div>
            </div>`;
}

const destinationIndex = itemdINdex("destinations");

displayDestanationDetails(dataSet, destinationIndex);

//event listeners section
destinationSwitcherBtns.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const id = e.target.dataset.index;

    displayDestanationDetails(dataSet, id);
  }
});

function highlightingCurrentBtn(index) {
  const btns = document.querySelectorAll("button");
  const spans = destinationSwitcherBtns.querySelectorAll("span");

  spans.forEach((span) => span.classList.add("scale-x-0"));
  const selectedBtnSpan = btns[index].querySelector("span");
  selectedBtnSpan.classList.remove("scale-x-0");
}
