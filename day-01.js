const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}


async function part_1() {
    const input = (await fs.readFile('./input-day-01.txt','utf8')).split('\n').map(v=>parseInt(v));
    let incr = 0;
    for (let i=1;i<input.length;i++) {
        if (input[i-1] < input[i]) incr++;
    }
    console.log(`Increments: ${incr}`);
}

async function part_2() {
    const input = (await fs.readFile('./input-day-01.txt','utf8')).split('\n').map(v=>parseInt(v));
    let incr = 0;
    let current_total = 0;
    let prev_total = 0;
    for (let i=3;i<input.length;i+=1) {
        prev_total = input[i-3]+input[i-2]+input[i-1];
        current_total = input[i-2]+input[i-1]+input[i];
        if (prev_total < current_total) {
            incr += 1;
        }
    }
    console.log(`Increments: ${incr}`);
}