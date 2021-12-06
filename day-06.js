const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}


async function part_1() {
    const fish = (await fs.readFile('./input-day-06.txt','utf8')).split(',').map(v=>parseInt(v));
    const DAYS_TO_SIMULATE = 80;
    for (let d=0;d<DAYS_TO_SIMULATE;d++) {
        const num_fish = fish.length;
        for (let i=0;i<num_fish;i++){
            fish[i] -= 1;
            if (fish[i] == -1) {
                fish.push(8);
                fish[i] = 6;
            }
        }
        //console.log('After ' + (d+1) + ' days: ' + fish.join(','));
    }
    console.log(`Fish: ${fish.length}`)
}


async function part_2() {
    const input = (await fs.readFile('./input-day-06.txt','utf8')).split(',').map(v=>parseInt(v));
    const DAYS_TO_SIMULATE = 256;
    const fish = [0,0,0,0,0,0,0,0];
    for (const num of input) {
        fish[num]++;
    }
    console.log(fish);
    let fish_to_add = null;
    for (let day=0;day<DAYS_TO_SIMULATE;day++) {
        fish_to_add = fish[0];
        for (let i=0;i<fish.length-1;i++){
            fish[i] = fish[i+1];
        }
        fish[8] = fish_to_add;
        fish[6] += fish_to_add;
        console.log(fish.join(','));
    }
    console.log(fish.reduce((a,b)=>a+b,0));
}