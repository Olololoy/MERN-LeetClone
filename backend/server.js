//--imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const {runJsCode} = require('./src/utils/utils.js');
const axios = require('axios');

//--app config
const port = 9000;
const app = express();

//--middleware
app.use(express.json());
app.use(cors());

//--dbconfig
//offloaded 4 lines

//--apiroutes
app.get('/', (req, res) => {
    res.status(200).send('Bellow Worldolo');
});

app.post('/submit', (req, res) => {
    const userFunctionBody = req.body.function ;
    const itWorks = runJsCode(userFunctionBody);
    const stringReturn = itWorks.toString();

    res.status(200).send(stringReturn);
});

app.post('/submitDocker', async (req, res) => {
    const userFunctionBody = req?.body?.function ;
    // const itWorks = runJsCode(userFunctionBody);
    // const stringReturn = itWorks.toString();

    // res.status(200).send(stringReturn);
    const solutionObject = {
        userFunction: userFunctionBody,
        testCase: [1, 2 , 3],
        expectedAns: 6,
    };


    // const result = await axios.post('http://localhost:9001/runCode', solutionObject );
    const result = await axios.post('http://localhost:9001/runCode',solutionObject);
    console.log(result.data);
    res.status(200).send(result.data);
});
// app.post( './testSolution', (req, res) => {

// })


//--test
/*
const userTestFunction = `function retsame (x) {
    return x ; 
}`;
// const itWorks = runJsCode(userTestFunction);
const newFunc = new Function(userTestFunction);
console.log(newFunc(1));
*/





//--listen
app.listen(port);



















//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
for now a single place to access problem data and a place to submit solutions.
    
server requests open at localhost:9000

db
2 things to store
    -auth and user info stuff 
        -detailed user stuff of different shallow and deep categories
        -just list of basic user details to access other deep and shallow categories AND authentication
    -problems 
        -shallow storage of problems 
        -various levels of deep storage of problems
            ( eg. test cases and description ( basic deep ) comment threads best solutions links to more learning or similar problem ( deep categories ))

thought stream 
various ways of existing and considering a case where every way of existence is okay, its okay to not exist in the best possible way ( most aware and most present in the present )

random spam thoughts and finally reducing them or maybe it even exists to a good extent even now but not very commonly.

*/