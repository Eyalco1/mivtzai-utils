const generateCaspiQuote = () => {
    const quotes = ['1', '2', '3', '4'];
    const theQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(theQuote, 'Caspi Says:');
};
