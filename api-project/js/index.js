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
      const listItem = `
      <div class="game-item p-4 border border-gray-700 rounded mb-4 bg-gray-800 flex items-center">
        <div class="flex-shrink-0">
          <img src="${item.fullPortrait}" alt="${item.displayName} Portrait" class="w-24 h-24 object-cover rounded mr-4">
        </div>
        <div class="flex-grow text-white">
          <strong><h3 class="text-lg font-bold">${item.displayName}</h3></strong>
          <p class="text-gray-300">${item.description}</p>
          <div>
            <h4 class="text-md font-semibold">Abilities:</h4>
            <ul class="list-disc">
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
      </div>
      `;
      itemList.insertAdjacentHTML("beforeend", listItem);
    });

    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const agentId = event.target.getAttribute("data-agent-id");
        await fetchAgentDetails(agentId);
      });
    });
  }

  function filterItems() {
    const searchText = searchBar.value.toLowerCase();
    const filterBy = filterSelect.value;
    const filteredItems = items.filter((item) => {
      if (filterBy === "displayName") {
        return item.displayName.toLowerCase().includes(searchText);
      } else if (filterBy === "role") {
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
