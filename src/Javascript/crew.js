import { dataSet, itemdINdex } from "./index.js";
const staffMembersSection = document.querySelector("#staff-members-section");

function crewPopulation(dataSet, index) {
  const { crew } = dataSet;
  const crewData = crew[index];

  localStorage.setItem("crew", JSON.stringify({ crew, index }));

  staffMembersSection.innerHTML = "";
  const {
    name,
    images: { webp },
    role,
    bio,
  } = crewData;

  staffMembersSection.innerHTML = ` <section class="grid gap-10">
          <div class="grid gap-8">
            <div>
              <p class="text-gray-400 text-lg">${role}</p>
              <strong class="text-white text-5xl">${name}</strong>
            </div>
            <p class="max-w-100 text-gray-400 pb-4">
             ${bio}
            </p>
          </div>

          <ul
            id="circle-switcher"
            class="flex gap-5 row-start-1 md:row-start-2 justify-self-center col-span-full md:justify-self-start group"
          >
            <button
              class="size-3 rounded-full bg-gray-700 hover:bg-white hover:scale-105 transition-colors delay-75 ease-linear cursor-pointer"
            ></button>
            <button
              class="size-3 rounded-full bg-gray-700 hover:bg-white hover:scale-105 transition-colors delay-75 ease-linear cursor-pointer"
            ></button>
            <button
              class="size-3 rounded-full bg-gray-700 hover:bg-white hover:scale-105 transition-colors delay-75 ease-linear cursor-pointer"
            ></button>
            <button
              class="size-3 rounded-full bg-gray-700 hover:bg-white hover:scale-105 transition-colors delay-75 ease-linear cursor-pointer"
            ></button>
          </ul>
        </section>

        <img
          src="${webp}"
          alt="staff image"
          class="w-7/12 sm:w-56"
          id="staff-image"
        />`;
  highlightingClickedCircle(index);
}

const currIndex = itemdINdex("crew");
crewPopulation(dataSet, currIndex);

staffMembersSection.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    let btns = staffMembersSection.getElementsByTagName("button");
    const arr = [...btns];
    const index = arr.findIndex((node) => node === e.target);
    crewPopulation(dataSet, index);
  }
});

function highlightingClickedCircle(index) {
  const btns = staffMembersSection.querySelectorAll("button");

  btns.forEach((btn) => btn.classList.remove("bg-white"));

  btns[index].classList.add("bg-white", "scale-105");
}
