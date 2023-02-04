function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = () => {
    this.read = !this.read;
  };
}

function removeBook() {
  this.parentNode.remove();
}

function addCardElement(label, content) {
  const labelDiv = document.createElement("div");
  labelDiv.classList.add(label.toLowerCase());
  labelDiv.textContent = label;
  const contentElement = document.createElement("p");
  contentElement.appendChild(document.createTextNode(content));
  labelDiv.appendChild(contentElement);
  return labelDiv;
}

function addReadStatus(book) {
  const readDiv = document.createElement("div");
  readDiv.classList.add("read");
  readDiv.textContent = "Read";
  const readBox = document.createElement("input");
  readBox.type = "checkbox";
  readBox.checked = book.read;
  readBox.classList.add("read");
  readBox.addEventListener("change", book.toggleRead.bind(book));
  readDiv.appendChild(readBox);
  return readDiv;
}

function addRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", removeBook);
  removeButton.appendChild(document.createTextNode("Remove"));
  return removeButton;
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.appendChild(addCardElement("Title", book.title));
  if (book.author) {
    bookCard.appendChild(addCardElement("Author", book.author));
  }
  if (book.pages) {
    bookCard.appendChild(addCardElement("Pages", book.pages));
  }
  bookCard.appendChild(addReadStatus(book));
  bookCard.appendChild(addRemoveButton(book));
  bookCard.classList.add("card");
  return bookCard;
}

function displayBook(book) {
  const books = document.querySelector("div.books");
  books.appendChild(createBookCard(book));
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
    displayBook(book);
  }
}

function addEventListeners() {
  const form = document.querySelector(".form-container");

  const newBookButton = document.querySelector(".new");
  newBookButton.addEventListener("click", () => {
    form.style.display = "block";
  });

  const closeForm = document.querySelector(".close-form");
  closeForm.addEventListener("click", () => {
    form.style.display = "none";
  });

  const addBookButton = document.querySelector("button.submit");
  addBookButton.addEventListener("click", addBookToLibrary);
}

addEventListeners();
