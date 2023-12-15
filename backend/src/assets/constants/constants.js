const userInfo = {
    id: '739322',
    userName: 'Akshat Khandelwal',
    problemid: '001',
    solution: `function add(x, y ,z) {
        let a = x + y + z ;
        return a;
    }`,
};

const problem1 = {
    testCase: {
        tc1: [1, 3, 4],
        tc2: [23, 56, -67],
        },
    realSolution: `
    function solution ( x , y, z ) {
        let ans = x + y + z ; 
        return ans; 
    }
    `,

};

module.exports = {problem1, userInfo};