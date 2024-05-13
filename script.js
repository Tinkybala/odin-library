const myLibrary = [];

//Book object
class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        console.log("book created");
    }

    //return book info method
    info(){
        if(this.read == true){
            return `${this.title} by ${this.author}, ${this.pages} pages, read`
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
    
    }
    
    //change read status method
    changeReadStatus(){
        if(this.read == true){
            this.read = false;
            return;
        }
        this.read = true;
        return;
    }
}

//store book in library
function addBookToLibrary(book){
    myLibrary.push(book);
    console.log("book added")
}


//print out all books in library
function listBooks(){
    let table = document.querySelector("table");
    const body = document.querySelector("body");
    //remove current table
    body.removeChild(table);
    let new_table = document.createElement("table");
    let add_button = document.querySelector(".add");
    body.insertBefore(new_table, add_button);


    //create new tablw
    for(let i=0; i < myLibrary.length; i++){
        console.log(myLibrary[i].info());

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = myLibrary[i].info();

        //create delete button
        const del = document.createElement("button");
        del.setAttribute("type", "button");
        del.setAttribute("class", "delete");
        del.textContent = "Delete"
        del.addEventListener("click", ()=>{
            myLibrary.splice(i, 1);
            console.log("book removed");
            listBooks();
        })
        cell.appendChild(del);

        //create read-status button
        const read = document.createElement("button");
        read.setAttribute("type", "button");
        read.setAttribute("class", "change-read");
        read.textContent = "Change read status";
        read.addEventListener("click", ()=>{
            myLibrary[i].changeReadStatus();
            listBooks();
        })
        cell.appendChild(read);



        row.appendChild(cell);
        new_table.appendChild(row); 
    }
}


let book1 = new Book("book1", "michael", 123, true);
let book2 = new Book("book2", "haze", 321, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

listBooks();



//add book button to trigger modal
const btn = document.querySelector(".add");
const dialog = document.querySelector("dialog");

btn.addEventListener("click", ()=>{
    dialog.showModal();
})


//submit button to add book to library
const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let title = document.querySelector("#title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    console.log(document.getElementById("read").checked);
    let read = document.getElementById("read").checked;

    addBookToLibrary(new Book(title, author, pages, read));
    dialog.close();
    listBooks();
})
