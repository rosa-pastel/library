function addRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", () =>
    removeButton.parentNode.remove()
  );
  removeButton.appendChild(document.createTextNode("Remove"));
  return removeButton;
}

function createCardElement(label, content) {
  const labelDiv = document.createElement("div");
  labelDiv.classList.add("card-label");
  labelDiv.textContent = label;
  const contentElement = document.createElement("p");
  contentElement.appendChild(document.createTextNode(content));
  labelDiv.appendChild(contentElement);
  return labelDiv;
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = () => {
      this.read = !this.read;
    };
  }

  createReadStatus() {
    const readDiv = document.createElement("div");
    readDiv.classList.add("read");
    readDiv.textContent = "Read";
    const readBox = document.createElement("input");
    readBox.type = "checkbox";
    readBox.checked = this.read;
    readBox.addEventListener("change", this.toggleRead());
    readDiv.appendChild(readBox);
    return readDiv;
  }

  createBookCard() {
    const bookCard = document.createElement("div");
    bookCard.appendChild(createCardElement("Title", this.title));
    if (this.author)
      bookCard.appendChild(createCardElement("Author", this.author));
    if (this.pages)
      bookCard.appendChild(createCardElement("Pages", this.pages));
    bookCard.appendChild(this.createReadStatus());
    bookCard.appendChild(addRemoveButton());
    bookCard.classList.add("card");
    return bookCard;
  }

  displayBook() {
    const books = document.querySelector("div.books");
    books.appendChild(this.createBookCard());
  }
}

function formVal(event) {
  event.preventDefault();
  const titleNode = document.querySelector("input#title");
  const title = titleNode.value;
  const authorNode = document.querySelector("input#author");
  const author = authorNode.value;
  const pagesNode = document.querySelector("input#pages");
  const pages = pagesNode.value;

  let validity = 1;
  if (!title || title.trim() === "") {
    titleNode.classList.add("warning");
    validity = 0;
  } else {
    titleNode.classList.remove("warning");
  }
  if (!author || author.trim() === "") {
    authorNode.classList.add("warning");
    validity = 0;
  } else {
    authorNode.classList.remove("warning");
  }
  if (!pages || pages.trim() === "") {
    pagesNode.classList.add("warning");
    validity = 0;
  } else {
    pagesNode.classList.remove("warning");
  }
  if (validity) {
    const read = document.querySelector("input#read").checked;
    const book = new Book(title, author, pages, read);
    book.displayBook();
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
  addBookButton.addEventListener("click", formVal);
}

addEventListeners();
