
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');  // Import axios for making API requests

// const app = express();
// const port = 3001;

// // Enable CORS
// app.use(cors());

// // Define your quote API route
// app.get('/api/quotes/random', async (req, res) => {
//   try {
//     // Fetching a random quote from the Quotable API
//     const response = await axios.get('https://api.quotable.io/random');
//     const quote = response.data;

//     // Sending the quote as a JSON response to the frontend
//     res.json({
//       quoteText: quote.content,
//       quoteAuthor: quote.author
//     });
//   } catch (error) {
//     console.error('Error fetching the quote:', error.message);
//     res.status(500).json({ error: 'Failed to fetch quote' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());

// Route to fetch a random quote
app.get('/api/quotes/random', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    res.json({
      quoteText: quote.content,
      quoteAuthor: quote.author
    });
  } catch (error) {
    console.error('Error fetching random quote:', error.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Route to search quotes by author
app.get('/api/quotes/search', async (req, res) => {
  const author = req.query.author;

  try {
    const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`);
    const quotes = response.data.results;

    if (quotes.length > 0) {
      res.json({
        quotes: quotes.map(q => ({
          quoteText: q.content,
          quoteAuthor: q.author
        }))
      });
    } else {
      res.status(404).json({ message: 'No quotes found for the specified author' });
    }
  } catch (error) {
    console.error('Error searching quotes:', error.message);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
