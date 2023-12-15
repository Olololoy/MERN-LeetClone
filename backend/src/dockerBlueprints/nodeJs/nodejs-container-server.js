//--imports
const cors = require('cors');
const express = require('express');
const {runJsCode} = require('./utils/utils.js');

//--app config
const port = process.env.PORT || 9001;
const app = express();

//--middlewares
app.use(express.json());
app.use(cors());

//--apis
app.get('/', (req, res) => {
    console.log('got request');
    res.status(200).send('jsContainerHealthcheck');
});

app.post('/runCode', (req, res) => {
    console.log('gotRequest');
    const solutionObject = req.body;
    console.log(solutionObject);
    const correctSolution = runJsCode(solutionObject);
    let finalObj;
    if (correctSolution?.error) {
        finalObj = {error: correctSolution?.error };
    } else {
        finalObj = {passed: correctSolution};
    }

    res.status(200).send(finalObj);
});

//--listen
app.listen(port);



