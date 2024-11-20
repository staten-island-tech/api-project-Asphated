import "../css/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const quoteContainer = document.getElementById("quote");
  const newQuoteButton = document.getElementById("new-quote");

  async function fetchQuote() {
    try {
      const response = await fetch("https://api.kanye.rest/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      quoteContainer.textContent = data.quote;
    } catch (error) {
      quoteContainer.textContent = "Failed to fetch quote. Please try again.";
      console.error("Error fetching quote:", error);
    }
  }

  newQuoteButton.addEventListener("click", function () {
    console.log("Button clicked");
    fetchQuote();
  });

  fetchQuote();
});
