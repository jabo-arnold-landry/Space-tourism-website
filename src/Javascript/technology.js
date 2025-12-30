import { dataSet, itemdINdex } from "./index.js";

const technologyDetails = document.querySelector("#technology-details");
const technologyList = document.querySelector("#technology-list");
const pictureTag = document.querySelector("#picture-tag");

function technologyListCreation(nbr = 3) {
  technologyList.innerHTML = "";
  const btnFragment = document.createDocumentFragment();
  for (let i = 1; i <= nbr; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("border", "border-white", "px-4", "py-2", "rounded-full");
    btnFragment.append(btn);
  }
  return technologyList.append(btnFragment);
}

function technologyPopulation(dataSet, index) {
  const { technology } = dataSet;
  const technologyData = technology[index];

  localStorage.setItem("technology", JSON.stringify({ technology, index }));
  technologyListCreation(technology.length);
  technologyDetails.innerHTML = "";
  const {
    name,
    images: { portrait, landscape },
    description,
  } = technologyData;

  technologyDetails.innerHTML = `<div>
              <p class="text-gray-400 text-base capitalize">
                The terminology...
              </p>
              <strong class="font-bold text-5xl">${name}</strong>
            </div>
            <p class="max-w-lg md:max-w-160 text-gray-400">
              ${description}
            </p>`;

  pictureTag.innerHTML = ` <source
            media="(min-width:320 )"
            srcset="${landscape}"
          />
          <source
            media="(min-width:320 )"
            srcset="${portrait}"
          />
          <img
            src="${portrait}"
            alt="img"
            class="size-80"
          />`;
}

const technologyId = itemdINdex("technology");
technologyPopulation(dataSet, technologyId);
