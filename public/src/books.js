/*
  This function has two parameters, in the following order:

  - An array of author objects.
  - An integer ID of a single author object.

  It returns the author object that has the matching ID.

*/
function findAuthorById(authors, id) {
  // Loop through authors array and search for the author.
  // Return the author object where author.id === id is true.
  return authors.find((author) => author.id === id);
}

/*
  This function has two parameters, in the following order:

  - An array of book objects.
  - A string ID of a single book object.

  It returns the book object that has the matching ID.
*/
function findBookById(books, id) {
  // Loop through books array and search for the book.
  // Return the book object where book.id === id is true.
  return books.find((book) => book.id === id);
}

/*
  This function has a single parameter:

  - An array of book objects.

  It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

  The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have 
  been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.
*/
function partitionBooksByBorrowedStatus(books) {
  // The first array should contain books that have been loaned out and are not yet returned.
  // Create a variable 'unreturned' that stores the filtered results from the 'books' array when checking if the 'borrows' status of the 'book' object is false.
  const unreturned = books.filter((book) => !book.borrows[0].returned);
  // The second array should contain books that have been returned.
  // Create a variable 'returned' that stores the filtered results from the 'books' array when checking if the 'borrows' status of the 'book' object is true.
  const returned = books.filter((book) => book.borrows[0].returned);
  // Return an array with both arrays inside.
  return [unreturned, returned];
}

/*
  This function has two parameters, in the following order:

  - A book object.
  - An array of all account objects.

  It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should 
  include the `returned` entry from the corresponding transaction object in the `borrows` array.
*/
function getBorrowersForBook(book, accounts) {
  // Use the map() method to loop through the 'borrows' array of the book object.
  return (
    book.borrows
      .map((borrow) => {
        // Use the find() method within the map() method to loop through the 'accounts' array.
        // Pass in an anonymous function as the callback function that takes in each account and finds the account where account.id === borrow.id
        let account = accounts.find((account) => account.id === borrow.id);
        // Return the spread operator that contains the output values of the map() method as 'borrow' and the 'account' variable.
        return { ...borrow, ...account };
      })
      // Use the slice method on the output array to return up to index value 10 of the returned array only.
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
