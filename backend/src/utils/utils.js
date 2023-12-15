const {problem1} = require('../assets/constants/constants.js');

function runJsCode(text) {
    const testCaseObj = problem1?.testCase;
    const tc1 = testCaseObj.tc1;
    try {
    // console.log(problem1.realSolution);
    const userSolutionFunc = new Function(text + '\n return solution;')();
    const realSolutionFunc = new Function(problem1.realSolution + '\n return solution;')();

    const userAns = userSolutionFunc(tc1[0], tc1[1], tc1[2]);
    const realAns = realSolutionFunc(tc1[0], tc1[1], tc1[2]);
    
    return (userAns === realAns ?  true : false);
} catch ( err ) {
    console.log(err);
    return 'errorrr!!!';
}
}

module.exports = {runJsCode};