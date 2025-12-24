const navLinkSection = document.querySelector("#nav-links");
const destinationSwitcherBtns = document.querySelector("#destination-switcher");

const linkList = [
  { link: "00 home", url: "#" },
  { link: "01 destination", url: "#" },
  { link: "02 crew", url: "#" },
  { link: "03 technology", url: "#" },
];
const destinationList = ["moon", "mars", "europa", "titian"];

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

function destinationSwitcherBtnsCreation() {
  destinationSwitcherBtns.textContent = "";
  const btnDocFragment = document.createDocumentFragment();

  destinationList.forEach((destination) => {
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
    btn.innerHTML = `${destination}
                      <span
                        class="absolute top-6 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                      ></span>`;
    btnDocFragment.append(btn);
  });
  destinationSwitcherBtns.append(btnDocFragment);
}

destinationSwitcherBtnsCreation();
