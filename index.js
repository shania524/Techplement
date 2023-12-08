"use strict";

// assignment solution
// let quotes = [
//   "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
//   "Your time is limited, don't waste it living someone else's life.",
//   "In order to be truly happy, you must pursue your dreams and goals.",
//   "Darkness cannot drive out darkness: only light can do that.",
//   "People often say that motivation doesn't last. Well, neither does bathing. That's why we recommend it daily.",
//   "In the end, the whole of life becomes an act of letting go.",
// ];

// const randomNumber = () => Math.trunc(Math.random() * 5) ;
// console.log(randomNumber());

// function getQuote() {
//   const number = randomNumber();
//   for (let i = number; i < quotes.length; i++){
//     document.getElementById("quote").innerHTML = "\" " + quotes[number] + " \"";
//   }
// }

// const quoteBtn = document.getElementById("quote-generator");
// quoteBtn.addEventListener("click", getQuote); 


async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const quote = await response.json();
  console.log(quote);
  // Output the quote and author name
  document.getElementById("quote").innerHTML = "\" " + quote.content + " \"";
  document.getElementById("author").innerHTML = '- ' + quote.author + ' -';
}

const quoteBtn = document.getElementById("quote-generator");
quoteBtn.addEventListener("click", randomQuote);
