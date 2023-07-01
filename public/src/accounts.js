/*
  This function has two parameters, in the following order:

  - An array of account objects.
  - A string ID of a single account object.

  It returns the account object that has the matching ID.
*/
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

/*
  This function has a single parameter:

  - An array of account objects.

  It returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.
*/
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

/*
  This function has two parameters, in the following order:

  - An account object.
  - An array of all book objects.

  It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
*/
function getTotalNumberOfBorrows(account, books) {
  // Create a counter variable to store results
  let totalBorrows = 0;
  // Loop through the books array and then loop through the borrow array in order to check if the borrows id matches the account id
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      // If true,
      if (account.id === books[i].borrows[j].id) {
        // Add 1 to the counter
        totalBorrows += 1;
      }
    }
  }
  // After the loop, return the total number of borrows
  return totalBorrows;
}

/*
  This function has three parameters, in the following order:

  - An account object.
  - An array of all book objects.
  - An array of all author objects.

  It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. 
  It's not just the book object; the author object is nested inside of it.
*/
function getBooksPossessedByAccount(account, books, authors) {
  // Create variable to hold array results
  const booksBorrowed = [];
  // Loop through the 'book' object of the 'books' array.
  books.map((book) => {
    // Use the map() method to loop through the 'borrows' array of the 'book' object.
    book.borrows.map((borrow) => {
      // Loop through the 'author' object of the 'authors' array.
      authors.map((author) => {
        // If the 'author' id matches the 'book' authorId, then add the "author" key and equate it to 'author'.
        if (author.id === book.authorId) book["author"] = author;
      });
      // If NOT returned && iteration id === account.id, then add 'book' to 'booksBorrowed' with "author" key added.
      if (borrow.returned === false && borrow.id === account.id) {
        booksBorrowed.push(book);
      }
    });
  });
  return booksBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
