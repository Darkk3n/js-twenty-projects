//Get quotes from API
let apiQuotes = [];
let quoteText = document.getElementById('quote-text');
let author = document.getElementById('author');
let newQuoteBtn = document.getElementById('new-button')
let twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

getQuotes();

function newQuote() {
    loading();
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!randomQuote.author)
        author.textContent = 'Unknown';
    else
        author.textContent = randomQuote.author;

    randomQuote.text.length > 100 ?
        quoteText.classList.add('long-quote')
        :
        quoteText.classList.remove('long-quote');

    quoteText.textContent = randomQuote.text;
    complete();
}

async function getQuotes() {
    loading();
    const baseUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(baseUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}

newQuoteBtn.addEventListener('click', () => getQuotes());

twitterBtn.addEventListener('click', () => tweetQuote());

async function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

