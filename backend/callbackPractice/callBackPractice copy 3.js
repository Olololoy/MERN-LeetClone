//SOLUTION 2 ( DB REQUEST AFTER POPULATING THE INFO ARRAY)

const request = require('request');
const cheerio = require('cheerio');
const database = require('your-database-module'); // Replace with your actual database module

// Task 1: Fetch List of URLs
function fetchBookURLs(callback) {
  const url = 'https://example-books-website.com/books';

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const bookURLs = [];

      // Extract book URLs from the page
      $('a.book-link').each((index, element) => {
        bookURLs.push($(element).attr('href'));
      });

      callback(null, bookURLs);
    } else {
      callback(error || `Failed to fetch book URLs. Status code: ${response.statusCode}`);
    }
  });
}

// Task 2: Retrieve HTML Content for Each URL
function retrieveHTMLContent(bookURL, callback) {
  const url = `https://example-books-website.com${bookURL}`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      callback(error || `Failed to retrieve HTML content for ${url}. Status code: ${response.statusCode}`);
    }
  });
}

// Task 3: Extract Book Information
function extractBookInformation(htmlContent, callback) {
  const $ = cheerio.load(htmlContent);

  const bookInfo = {
    title: $('h1.book-title').text(),
    author: $('span.author').text(),
    price: $('span.price').text(),
  };

  callback(null, bookInfo);
}

// Task 4: Save Data to Array
function saveToArray(bookInfoArray, bookInfo, callback) {
  bookInfoArray.push(bookInfo);
  callback(null, bookInfoArray);
}

// Task 5: Save Array to Database
function saveArrayToDatabase(bookInfoArray, callback) {
  database.saveBooks(bookInfoArray, (error) => {
    if (error) {
      callback(`Failed to save book information array to the database: ${error}`);
    } else {
      callback(null, 'Book information array saved to the database');
    }
  });
}

// Usage
fetchBookURLs((fetchError, bookURLs) => {
  if (fetchError) {
    console.error(fetchError);
    return;
  }

  const bookInfoArray = [];

  // Use a counter to keep track of the number of books processed
  let booksProcessed = 0;

  bookURLs.forEach((url) => {
    retrieveHTMLContent(url, (retrieveError, htmlContent) => {
      if (retrieveError) {
        console.error(retrieveError);
        return;
      }

      extractBookInformation(htmlContent, (extractError, bookInfo) => {
        if (extractError) {
          console.error(extractError);
          return;
        }

        saveToArray(bookInfoArray, bookInfo, (saveError, updatedArray) => {
          if (saveError) {
            console.error(saveError);
            return;
          }

          booksProcessed++;

          if (booksProcessed === bookURLs.length) {
            // All books processed, save the array to the database
            saveArrayToDatabase(updatedArray, (saveArrayError, result) => {
              if (saveArrayError) {
                console.error(saveArrayError);
              } else {
                console.log(result);
              }
            });
          }
        });
      });
    });
  });
});



//SOLUTION 1 ( DB REQUEST AFTER EVERY BOOK INFO SUCCESS )

fetchBookURLs((fetchError, bookURLs) => {
  if (fetchError) {
    console.error(fetchError);
    return;
  }

  const bookInfoArray = [];

  // Use a counter to keep track of the number of books processed
  let booksProcessed = 0;

  bookURLs.forEach((url) => {
    retrieveHTMLContent(url, (retrieveError, htmlContent) => {
      if (retrieveError) {
        console.error(retrieveError);
        return;
      }

      extractBookInformation(htmlContent, (extractError, bookInfo) => {
        if (extractError) {
          console.error(extractError);
          return;
        }

        saveToArray(bookInfoArray, bookInfo, (saveError, updatedArray) => {
          if (saveError) {
            console.error(saveError);
            return;
          }

          booksProcessed++;

          if (booksProcessed === bookURLs.length) {
            // All books processed, save the array to the database
            saveArrayToDatabase(updatedArray, (saveArrayError, result) => {
              if (saveArrayError) {
                console.error(saveArrayError);
              } else {
                console.log(result);
              }
            });
          }
        });
      });
    });
  });
});


fetchBookURLs((fetchError, bookURLs) => {
  if (fetchError) {
    console.error(fetchError);
    return;
  }

  bookURLs.forEach((url) => {
    retrieveHTMLContent(url, (retrieveError, htmlContent) => {
      if (retrieveError) {
        console.error(retrieveError);
        return;
      }

      extractBookInformation(htmlContent, (extractError, bookInfo) => {
        if (extractError) {
          console.error(extractError);
          return;
        }

        saveToDatabase(bookInfo, (saveError, result) => {
          if (saveError) {
            console.error(saveError);
          } else {
            console.log(result);
          }
        });
      });
    });
  });
});
