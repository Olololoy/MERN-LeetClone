function makeXmlHttpRequest (type, url, onSuccess, onError){
var xhr = new XMLHttpRequest();
xhr.open(type, url, true);
xhr.onreadystatechange = function () {
if (xhr.readyState == 4){
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError();
    }}
};
xhr.send();
}


function getAllStoredBooksInfo (url, onSuccess, onFail) {
const finalInfoArray = [];

function fetchArrayFromRes (res) {
    let array;
    // some smart code
    return array;
}

function fetchHtmlElementsTags (source, tag, class_name) {
var required_value = '';
//some smart code
return required_value;
}

makeXmlHttpRequest(
    'GET',
    url, 
    (arrayRes) => {
    const booksUrlArray = fetchArrayFromRes(arrayRes);
    const forcePassByRef = {
        initArrayResLength: booksUrlArray.length,
        currLength: 0
    };
    booksUrlArray.forEach((indiUrl) => {
        makeXmlHttpRequest(
            'GET', 
            indiUrl, 
            (res) => {
                ((htmlRes, passByRef) => {
                    const bookTitle = fetchHtmlElementsTags(htmlRes, 'h1', 'book-title');
                    const author = fetchHtmlElementsTags(htmlRes, 'span', 'author');
                    const price = fetchHtmlElementsTags(htmlRes, 'span', 'price');
                    const bookInfoObj = {
                    bookTitle,
                    author,
                    price,
                    };
                    finalInfoArray.push(bookInfoObj);
                    passByRef.currLength = passByRef.currLength + 1;
                    if (passByRef.currLength === passByRef.initArrayResLength) {
                        onSuccess(finalInfoArray);
                    }
                    })(res, forcePassByRef);
            }, 
            () => {
                ((passByRef) => {
                    console.log('errorFetchingBookHtml');
                    passByRef.currLength = passByRef.currLength + 1;
                    if (passByRef.currLength === passByRef.initArrayResLength) {
                        onSuccess(finalInfoArray);
                    }
                    })(forcePassByRef);
            });
        });
    }, 
    () => {
        onFail();
    console.log('errorfetchingAllBooksUrlArray');
    console.log('program Execution Ends');
    }
);

}


function uploadToDatabase (data) {
console.log(`uploading to Database`);
//some smart code
console.log(`uploaded to database`);
}


getAllStoredBooksInfo(
    `https://example-books-website.com/books`, 
    (resArray) => {
    console.log(resArray);
    if ( resArray.length > 0 )
    uploadToDatabase(resArray);
    }, 
    () => {
        console.log(`error fetching all books details`);
});

console.log('index.js completed execution');




















