
function runJsCode(obj) {
    const userFunction = obj?.userFunction;
    const testCase = obj?.testCase;
    const expectedAns = obj?.expectedAns;

    try {
    const userSolutionFunc = new Function(userFunction + '\n return solution;')();

    const userAns = userSolutionFunc(...testCase);
    
    return (userAns === expectedAns ?  true : false);
} catch ( err ) {
    return {error: err};
}
}

module.exports = {runJsCode};