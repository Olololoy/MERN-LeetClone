function makeXmlHttpRequest (type, url, onSuccess, onError) {
var xhr = new XMLHttpRequest();

xhr.open(type, url, true);

xhr.onreadystatechange = function () {
if (xhr.readyState == 4 && xhr.status == 200) {
onSuccess(xhr.responseText);
} else {
onError();
}};

xhr.send();
}


function getAllStoredBooksInfo(url) {

    function onSuccess(res) {
        console.log(res);
    }

    function onError() {
        console.log('errorOccuerd');
    }

    makeXmlHttpRequest('GET', url, onSuccess, onError);
}




const allBooksArrayRes = getAllStoredBooksInfo(`https://example-books-website.com/books`);

console.log(allBooksArrayRes);
