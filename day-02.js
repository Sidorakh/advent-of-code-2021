const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}

async function part_1() {
    const instructions = (await fs.readFile('./input-day-02.txt','utf8')).split('\n').map(v=>v.trim().split(' ')).map(v=>({direction: v[0],distance: parseInt(v[1])}));
    const position = {
        x: 0,
        y: 0,
    }

    for (const instruction of instructions) {
        switch (instruction.direction) {
            case 'forward': 
                position.x += instruction.distance;
            break;
            case 'down':
                position.y += instruction.distance;
            break;
            case 'up':
                position.y -= instruction.distance;
            break;
        }
    }
    console.log(position);
}

async function part_2() {
    const instructions = (await fs.readFile('./input-day-02.txt','utf8')).split('\n').map(v=>v.trim().split(' ')).map(v=>({direction: v[0],distance: parseInt(v[1])}));
    const position = {
        x: 0,
        y: 0,
        aim: 0,
    }

    for (const instruction of instructions) {
        switch (instruction.direction) {
            case 'forward': 
                position.x += instruction.distance;
                position.y += position.aim*instruction.distance;
            break;
            case 'down':
                position.aim += instruction.distance;
            break;
            case 'up':
                position.aim -= instruction.distance;
            break;
        }
    }
    console.log(position);
}