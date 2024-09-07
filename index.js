// document.addEventListener('DOMContentLoaded', () => {
//   fetchQuote();  // Automatically fetch a random quote when the page loads
// });

// const randomBtn = document.getElementById('random-btn');
// const searchBtn = document.getElementById('search-btn');

// // Fetch random quote
// async function fetchQuote() {
//   try {
//     const response = await fetch('http://localhost:3001/api/quotes/random');
//     if (!response.ok) throw new Error('Network response was not ok');
//     const data = await response.json();
//     displayQuote(data.quoteText, data.quoteAuthor);
//   } catch (error) {
//     console.error('Failed to fetch quote:', error);
//     displayQuote('Failed to fetch quote', '');
//   }
// }

// // Search quotes by author
// async function searchQuote() {
//   const author = document.getElementById('author-input').value;
//   try {
//     const response = await fetch(`http://localhost:3001/api/quotes/search?author=${author}`);
//     if (!response.ok) throw new Error('Network response was not ok');
//     const data = await response.json();
//     if (data.results.length > 0) {
//       const quote = data.results[0];
//       displayQuote(quote.content, quote.author);
//     } else {
//       displayQuote('No quotes found for this author', '');
//     }
//   } catch (error) {
//     console.error('Failed to search quote:', error);
//     displayQuote('Failed to fetch quote', '');
//   }
// }

// // Display quote in the HTML
// function displayQuote(text, author) {
//   document.getElementById('quote-text').textContent = text;
//   document.getElementById('quote-author').textContent = author;
// }

// // Event listeners
// randomBtn.addEventListener('click', fetchQuote);
// searchBtn.addEventListener('click', searchQuote);
document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display a random quote when the page loads
  fetchQuote();

  // Attach event listener for random quote button
  document.getElementById('randomQuoteBtn').addEventListener('click', fetchQuote);

  // Attach event listener for search functionality
  document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const author = document.getElementById('searchInput').value.trim();
    if (author) {
      searchQuoteByAuthor(author);
    }
  });
});

// Function to fetch a random quote
async function fetchQuote() {
  try {
    const response = await fetch('http://localhost:3001/api/quotes/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    displayRandomQuote(data.quoteText, data.quoteAuthor);
  } catch (error) {
    console.error('Error fetching quote:', error);
    document.getElementById('quoteText').textContent = 'Failed to fetch quote';
  }
}

// Function to search quotes by author
async function searchQuoteByAuthor(author) {
  try {
    const response = await fetch(`http://localhost:3001/api/quotes/search?author=${author}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes for the author');
    }
    const data = await response.json();
    if (data.quotes && data.quotes.length > 0) {
      // Display the first quote found for the author
      displaySearchQuote(data.quotes[0].quoteText, data.quotes[0].quoteAuthor);
    } else {
      displaySearchQuote('No quotes found for the specified author', '');
    }
  } catch (error) {
    console.error('Error searching quotes:', error);
    displaySearchQuote('Failed to fetch quotes for the author', '');
  }
}

// Function to display the random quote
function displayRandomQuote(text, author) {
  document.getElementById('quoteText').textContent = text;
  document.getElementById('quoteAuthor').textContent = author;
}

// Function to display the search result quote below the search bar
function displaySearchQuote(text, author) {
  const searchResultText = document.getElementById('searchResultText');
  const searchResultAuthor = document.getElementById('searchResultAuthor');

  searchResultText.textContent = text;
  searchResultAuthor.textContent = author ? `— ${author}` : '';
}
