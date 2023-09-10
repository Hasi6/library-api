import 'module-alias/register';
import connection, { Author, Book } from './data';

const authorsData = [
  {
    firstName: 'Emma',
    lastName: 'Smith',
    books: [
      { name: 'Book 1 by Emma', isbn: 'ISBN123456' },
      { name: 'Book 2 by Emma', isbn: 'ISBN789012' }
    ]
  },
  {
    firstName: 'Liam',
    lastName: 'Johnson',
    books: [
      { name: 'Book 1 by Liam', isbn: 'ISBN345678' },
      { name: 'Book 2 by Liam', isbn: 'ISBN901234' }
    ]
  },
  {
    firstName: 'Olivia',
    lastName: 'Brown',
    books: [
      { name: 'Book 1 by Olivia', isbn: 'ISBN567890' },
      { name: 'Book 2 by Olivia', isbn: 'ISBN123789' }
    ]
  },
  {
    firstName: 'Noah',
    lastName: 'Davis',
    books: [
      { name: 'Book 1 by Noah', isbn: 'ISBN678901' },
      { name: 'Book 2 by Noah', isbn: 'ISBN234567' }
    ]
  },
  {
    firstName: 'Sophia',
    lastName: 'Wilson',
    books: [
      { name: 'Book 1 by Sophia', isbn: 'ISBN789012' },
      { name: 'Book 2 by Sophia', isbn: 'ISBN345678' }
    ]
  }
];

(async () => {
  await connection.sync();

  // Loop through the authorsData array and create authors and books
  for (const authorInfo of authorsData) {
    const author = await Author.create({
      firstName: authorInfo.firstName,
      lastName: authorInfo.lastName
    });

    // Create books for the author
    for (const bookInfo of authorInfo.books) {
      await Book.create({
        name: bookInfo.name,
        isbn: bookInfo.isbn,
        authorId: author.id // Pass the author's ID as authorId
      });
    }
  }

  console.log('Authors and books created successfully.');
})();
