class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    // Display books

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    // Add book to list

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    // Delete book from list

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    // SHow alert messages

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className} mt-3 text-center`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        setTimeout(() =>
            document.querySelector(".alert").remove(), 1500
        );
    }

    // Clear form fields

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}


class Store {

    // Get book from storage to display 

    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    // Add book to storage

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Remove book from storage

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Display book event

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add book event

document.querySelector("#book-form").addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validatation 

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill all the fields", "danger");
    }
    else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book added successfully", "success");
        UI.clearFields();
    }
});

// Delete book event

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);

    // Removing book from Store

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert("Book deleted successfully", "success");
});