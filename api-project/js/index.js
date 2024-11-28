import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://valorant-api.com/v1/agents";
  const searchBar = document.getElementById("searchBar");
  const filterSelect = document.getElementById("filterSelect");
  const itemList = document.getElementById("itemList");

  let items = [];

  async function fetchItems() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      items = data.data;
      renderItems(items);
    } catch (error) {
      console.error("oh no error:", error);
    }
  }

  function renderItems(filteredItems) {
    itemList.innerHTML = "";
    filteredItems.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.classList.add(
        "game-item",
        "p-4",
        "border",
        "border-gray-500",
        "rounded",
        "mb-4",
        "bg-gray-455",
        "flex",
        "items-center",
      );

      listItem.innerHTML = `
      <img src="${item.fullPortrait}" alt="${item.displayName} Portrait" class="w-48 h-48 object-cover rounded mr-4">
      <div class="text-white">
        <h3 class="text-lg font-bold">${item.displayName}</h3>
        <p class="text-gray-300">${item.description}</p>
        <div>
          <h4 class="text-md font-semibold">Abilities:</h4>
          <ul class="list-disc pl-5">
            ${item.abilities
              .map(
                (ability) => `
              <li>
                <strong>${ability.displayName}:</strong> ${ability.description}
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>
      `;

      itemList.appendChild(listItem);
    });
  }

  function filterItems() {
    const searchText = searchBar.value.toLowerCase();
    const filterBy = filterSelect.value;
    const filteredItems = items.filter((item) => {
      if (filterBy == "displayName") {
        return item.displayName.toLowerCase().includes(searchText);
      } else if (filterBy == "role") {
        return (
          item.role && item.role.displayName.toLowerCase().includes(searchText)
        );
      }
      return false;
    });
    renderItems(filteredItems);
  }

  searchBar.addEventListener("input", filterItems);
  filterSelect.addEventListener("change", filterItems);

  fetchItems();
});
