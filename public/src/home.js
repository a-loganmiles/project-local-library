/*
  This function has a single parameter:

  - An array of book objects.

  It returns a _number_ that represents the number of book objects inside of the array.
*/
function getTotalBooksCount(books) {
  // Return the length of the 'books' array.
  return books.length;
}

/*
  This function has a single parameter:

  - An array of accounts.

  It returns a _number_ that represents the number of account objects inside of the array.

*/
function getTotalAccountsCount(accounts) {
  // Return the length of the 'accounts' array.
  return accounts.length;
}

/*
  This function has a single parameter:

  - An array of books.

  It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in 
  the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.
*/
function getBooksBorrowedCount(books) {
  // Create a counter variable to store results.
  let borrowedBooks = 0;
  // Loop through the 'book' object of the books' array using the forEach() method.
  books.forEach((book) => {
    // Check if the 'borrows' array of the 'book' object has a 'returned' status of false. If so, add 1 to the counter.
    if (!book.borrows[0].returned) borrowedBooks++;
  });
  // Return the counter total.
  return borrowedBooks;
}

/*
  This function has a single parameter:

  - An array of book objects.

  It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

  Each object in the returned array has two keys:

  - The `name` key which represents the name of the genre.
  - `count` key which represents the number of times the genre occurs.

  Even if there is a tie, the array should only contain no more than five objects.
*/

function getMostCommonGenres(books) {
  // Create a variable for 'books' array that maps the genre of the 'book' object.
  const genresOfBooks = books.map((book) => book.genre);
  // Create an empty array to store the results.
  const mostCommonGenres = [];
  // Map over the book genres.
  genresOfBooks.map((genre) => {
    // Create a variable that check if each genre already exists in array
    const location = mostCommonGenres.findIndex(
      (element) => element.name === genre
    );
    // If it exists and is greater than 0, increase count by 1
    if (location >= 0) {
      mostCommonGenres[location].count = mostCommonGenres[location].count + 1;
      // Otherwise, push a new genre object onto array with count of 1
    } else {
      mostCommonGenres.push({ name: genre, count: 1 });
    }
  });
  // Sort the array
  mostCommonGenres.sort((a, b) => b.count - a.count);
  // If the array has more than five objects, return top five
  if (mostCommonGenres.length > 5) {
    return mostCommonGenres.slice(0, 5);
  }
  // Otherwise, return array
  return mostCommonGenres;
}

/*
  This function has a single parameter:

  - An array of book objects.

   It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been 
   borrowed.

  Each object in the returned array has two keys:

  - The `name` key which represents the title of the book.
  - The `count` key which represents the number of times the book has been borrowed.

  Even if there is a tie, the array should only contain no more than five objects.
*/
function getMostPopularBooks(books) {
  // Create variable initialized to empty array to store results.
  let popularBooks = [];
  // Loop through 'books' array, creating new objects with 'name' and 'count' keys, and pushing them onto 'popularBooks' array.
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);
  // Call helper function 'topFive' with 'popularBooks' array to return top five results.
  return topFive(popularBooks);
}

// Create at least one helper method for any of the functions that you implemented for this assignment.
// This helper function sorts an array and returns the top five.
function topFive(array) {
  // Create variable to store results
  let popularBooks = array
    // Sort array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    // Slice array to limit results to the top five.
    .slice(0, 5);
  // Return the results of the sorted and sliced array.
  return popularBooks;
}

/*
  This function has two parameters, in the following order:

  - An array of book objects.
  - An array of author objects.

   It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding 
   all of the books written by the author and then adding up the number of times those books have been borrowed.

  Each object in the returned array has two keys:

  - The `name` key which represents the first and last name of the author.
  - The `count` key which represents the number of times the author's books have been borrowed.

  Even if there is a tie, the array should contain no more than five objects.
*/
function getMostPopularAuthors(books, authors) {
  // Create a variable initialized to an empty array to store results.
  const popularAuthors = [];
  // Loop through 'authors'.
  for (let author of authors) {
    // Create new variable 'authorName' with author's first name and last name.
    const authorName = `${author.name.first} ${author.name.last}`;
    // Create counter variable to store results.
    let count = 0;
    // loop through 'books'.
    for (let book of books) {
      // Check if 'author' id and 'book' id match.
      if (author.id === book.authorId) {
        // If so, add number of borrowed books to 'count'.
        count += book.borrows.length;
      }
    }
    // Create variable 'authorObject' object with the keys 'name' and 'count'.
    const authorObject = { name: authorName, count: count };
    // Add 'authorObject' to 'popularAuthors' array.
    popularAuthors.push(authorObject);
  }
  // Call the helper function topFive() to sort the 'popularAuthors' array & return the top five results.
  return topFive(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
