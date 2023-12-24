//FIRST DRAFT THEN BETTER ig

//( not too strict but if it saves time and makes me focus on the real problem more then yes

// but also can think of how to make it better and then make it better later

//)

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

function fetchAllBooksSuccess(arrayRes) {
    const booksUrlArray = fetchArrayFromRes(arrayRes);
    const forcePassByRef = {
        initArrayResLength: booksUrlArray.length,
        currLength: 0
    };
    booksUrlArray.forEach((indiUrl) => {
    // const true_last = (index === booksUrlArray.length - 1) ? true : false; 
    makeXmlHttpRequest('GET', indiUrl, (res) => {fetchIndiBookSuccess(res, forcePassByRef)}, () => {fetchIndiBookFailure(forcePassByRef)});
    });
}

function fetchAllBooksFailure () {
    onFail();
console.log('errorfetchingAllBooksUrlArray');
console.log('program Execution Ends');
}

function fetchHtmlElementsTags (source, tag, class_name) {
var required_value = '';
return required_value;
}

function fetchIndiBookSuccess (htmlRes, passByRef) {
const bookTitle = fetchHtmlElementsTags(htmlRes, 'h1', 'book-title');
const author = fetchHtmlElementsTags(htmlRes, 'span', 'author');
const price = fetchHtmlElementsTags(htmlRes, 'span', 'price');
const bookInfoObj = {
bookTitle,
author,
price,
};
finalInfoArray.push(bookInfoObj);
// if (true_last) {
//     onSuccess(finalInfoArray);
// }
passByRef.currLength = passByRef.currLength + 1;
if (passByRef.currLength === passByRef.initArrayResLength) {
    onSuccess(finalInfoArray);
}
}

function fetchIndiBookFailure (passByRef) {
console.log('errorFetchingBookHtml');
passByRef.currLength = passByRef.currLength + 1;
if (passByRef.currLength === passByRef.initArrayResLength) {
    onSuccess(finalInfoArray);
}
// if (true_last) {
//     onSuccess(finalInfoArray);
// }
}

makeXmlHttpRequest('GET', url, fetchAllBooksSuccess, fetchAllBooksFailure);
// return finalInfoArray;
}


function uploadToDatabase (data) {

}

function getAllBooksInfo_success (resArray) {
    console.log(resArray);
    if ( resArray.length > 0 )
    uploadToDatabase(resArray);
} 

function getAllBooksInfo_fail () {
    console.log(`error fetching all books details`);
}

getAllStoredBooksInfo(`https://example-books-website.com/books`, getAllBooksInfo_success, getAllBooksInfo_fail);

console.log('index.js completed execution');

// console.log(allBooksArrayRes);

// uploadToDatabase(allBooksArrayRes); //using callbacks

// handling error or partial error







































/*

better later

xml http request function

stored books info feed the url function

transform the exclusively defined functions to arrowfuncitons

// lets assume thes functions that we are using were mostly extracted from a library

make this happen, assume the functions were imported from somewhere else, keep the general functionality separate from the specific operations that we wanted

// funcitons just being some combined lines of logic

// assumption that we can live without functions and just write data

some fundamental realizations about data, data is what is understood by us , for a pc a byte with 9 bits is of absolutely no use for the pc/processor

coz it is not meant to understand the whatever pattern of arrangement of

I guess data being such a broad could be understood in terms of many and many definitions

random information given a particular arrangement can be considered data

just some data morphed into understandable form of data for some other observer/ data input machine or being or interpretor.

*/


/*
I had a theory and some complementary doubts too ( kis setting me bol rha hu usse se bhi speech decide hoti hai )
    //gec aur normal code execution me most instructions process ho jaate hai and async ke 
    SO why it happens the way it does and is it exhaustive, I'll look into later
        but regarding how it happens, I do have a theory for now

    1- code ( instructions ) divided into 2 major parts 
        A- callback async js instructions and the routines that have to be followed and the ways to implement it ( like fetch by browser api or settimeout by browser api also using a clock sync )
        B- normal any sort of code implementation ( non async )

    2- first go through me B- wale instructions execute ho jaate hai aur async wale instructions minimally SAVE/STORE execute ho jaate hai
        + async apis trigger ho jaati hai and parallely outsourced jagaho pe run hone lagti hai

    3- GEC me saare cheeze execute ho jaati hai and jahaa bhi async code aata hai wo store or send ho jaata hai 
    //GEC destroy ho jaat ahai kya callbacks run hone se pehle aur GEC se related saare defined functions bhi 
        + agar aisa hota hai to async apis ko saare functions ( even nested ) send karne hi padenge jo potentially run ho sakte hai kyuki unki definiton ab exist hi nahi karti kahi pe bhi

    4- ab async operations jaise hi execution khatam karke api me result produce karte hai to api result wapas bhejti hai and API hi corresponding callback function pack karke bhejti hai run hone ke liye
        callback queue me jo js code hai + async apis ke results ( most probably uske arguments me rakhe hue ) wo usi js thread pe execute hote hai ( probably jiska ab pichle gec se koi lena dena hai hai**** check this assumption****)
            // upon checking the assumption it was realized that GEC persists till the process exists
                and probably the functions whose reference is used by any other function or even callback funcitons aren't necessarily garbage collected and are persisted
                // so firstly my assumption was already a bit wrong when I thought that passing a function to another function is about actually copying the function whether in fact it is just passing the function by reference 
                    //// *** the potential assumption came up as a result of a wrong opinionised doubt formed way earlier while doing react native, that functions are also objects and when we pass the function name it may be being passed by value as an object
                        //// firstly, even objects are passed by reference ( maybe even across modules ) and so are functions, they are always passed as references not ever copied. In case some funcions are being referenced by some other function they are not garbage collected and instead kept in heap so they can be used by the reference it has been passed to.
    
    5- now the functions whose references are held can be called but the line by line execution of the initial file/module is over and the only execution is of the callbacks.
        now all instruction execution only takes place from callbacks ( which may create more callbacks (by running async apis or certain special apis in the background) )
        Also the only practical usage of callbacks is at the time of async operations altough we can get functions to callback queue using (settimeout,0) and in node.js (setImmediate)
        
    Ek tareeke se initial file/module execution se normal code execute ho jaata hai, initial async request apis me send hoke process honi chalu ho jaati hai, baaki logic ki async ke reponses se kya karna wo sab bhi mention karna hota hai and wo sab bhi ek tareeke se saved ho jaata hai
        aisa keh sakte hai initial execution ke baad ek tareeke se listeners functions ki tarah cheeze save o jaati hai and jaise hi api se async responses aate hai wo listener function execute hone lagte hai

    - Even callback hell could be reflecting on this behaviour ( which happens in reality tho ), callback calling callback calling callback calling callback.In a heavier situation situation leads to callback hell

questions
    // ye tareeka baad me kucch predefined instructions process karne ka async programming kaise enforce karti hai
    // aur kya tareeke the jisko follow kar sakte the async programming ke liye
    // single threaded rakhne ka faayeda kya hai and disadvantages kya hai direct parallel processing disable karne ke
    // async aur non blocking complementary terms nahi hai kya ?

    // async await and promises purelycallback async programming ka ek fundamental hai ya kisi aur tareeke se hi implemented hai?
    // what is async programming at its core also blocking or non blocking programming ?

    ***** for now I can be keeping these questions the way they are and just work on the most important ones which give me direct progress towards understanding clalabcks and async in js


    **** summarized tags dena concepts or realizations ko, spam remembering kel iye ( baaki wo waterpump wala waise bhi figured out to nahi tha puri tareeke se, aisa ho sakta hai not sure tho)
        But the water pump thing gives a tag to be remembered and as a checkpoint ( could be made by me and maybe against what I said  brain may be able to look into depth of what it really meant rather than just focuisng on the tags )


    **** how can we make a program to count certain miliseconds, do we check at every milisecond and what kind of error will always be there and what error range can we introduce to make it more optimal???

    **** jaise os me system interrupts rehte hai waise bi async ko implement kar sakte hai ( ye idea pehle bhi aaya hi tha but interrupts pehle hi ek well settled and optimized approach hai )

    
    */