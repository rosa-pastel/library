const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function () {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
    }
    console.log(this);
  };
}

function removeBook() {
  this.parentNode.remove();
}

function displayBook(book) {
  const bookCards = document.querySelector("div.books");

  const bookCard = document.createElement("div");

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = "Title";
  const titleContent = document.createElement("p");
  titleContent.appendChild(document.createTextNode(book.title));
  title.appendChild(titleContent);

  bookCard.appendChild(title);

  if (book.author) {
    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = "Author";
    const authorContent = document.createElement("p");
    authorContent.appendChild(document.createTextNode(book.author));
    author.appendChild(authorContent);

    bookCard.appendChild(author);
  }

  if (book.pages) {
    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = "Pages";
    const pagesContent = document.createElement("p");
    pagesContent.appendChild(document.createTextNode(book.pages));
    pages.appendChild(pagesContent);

    bookCard.appendChild(pages);
  }

  const read = document.createElement("div");
  read.classList.add("read");
  read.textContent = "Read";
  const readBox = document.createElement("input");
  readBox.type = "checkbox";
  readBox.checked = book.read;
  readBox.classList.add("read");
  const toggleFunc = book.toggleRead.bind(book);
  readBox.addEventListener("change", toggleFunc);
  read.appendChild(readBox);
  bookCard.appendChild(read);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", removeBook);
  removeButton.appendChild(document.createTextNode("Remove"));
  bookCard.appendChild(removeButton);

  bookCard.classList.add("card");
  bookCards.appendChild(bookCard);
}

function addBookToLibrary(event) {
  event.preventDefault();
  const titleNode = document.querySelector("input#title");
  const title = titleNode.value;
  if (!title || title.trim() === "") {
    titleNode.classList.add("warning");
  } else {
    titleNode.classList.remove("warning");
    const author = document.querySelector("input#author").value;
    const pages = document.querySelector("input#pages").value;
    const read = document.querySelector("input#read").checked;
    const book = new Book(title, author, pages, read);
    library.push(book);
    displayBook(book);
  }
}
const form = document.querySelector(".form-container");
const closeForm = document.querySelector(".close-form");
const newBookButton = document.querySelector(".new");
newBookButton.addEventListener("click", () => {
  form.style.display = "block";
});
closeForm.addEventListener("click", () => {
  form.style.display = "none";
});

const addBookButton = document.querySelector("button.submit");
addBookButton.addEventListener("click", addBookToLibrary);
