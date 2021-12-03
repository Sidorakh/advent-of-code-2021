const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}

async function part_1() {
    const bitmasks = (await fs.readFile('./input-day-03.txt','utf8')).split('\n').map(v=>v.trim());
    const total = [];
    for (let i=0;i<bitmasks[0].length;i++) {
        total.push({
            '0': 0,
            '1': 0,
        });
    }
    for (const bitmask of bitmasks) {
        for (let i=0;i<bitmask.length;i++) {
            if (bitmask[i] == '0') {
                total[i]['0'] += 1;
            } else {
                total[i]['1'] += 1;
            }
        }
    }
    let final_mask = '';
    for (const bit of total) {
        if (bit['0'] > bit['1']) {
            final_mask += '0';
        } else {
            final_mask += '1';
        }
    }
    //console.log(final_mask);
    const flipped_mask = [...final_mask].map(v=>v=='1' ? '0' : '1').join('');

    const gamma_rate = parseInt(final_mask,2);
    const epsilon_rate = parseInt(flipped_mask,2);
    console.log('Consumption: ' + gamma_rate*epsilon_rate);
    return total;
}

async function part_2() {
    const bitmasks = (await fs.readFile('./input-day-03.txt','utf8')).split('\n').map(v=>v.trim());
    let oxygen_masks = JSON.parse(JSON.stringify(bitmasks));
    let co2_masks = JSON.parse(JSON.stringify(bitmasks));

    const first_mask = oxygen_masks[0];
    for (let bit=0;bit<first_mask.length;bit++) {
        let totals = {
            '0':0,
            '1': 0,
        }
        console.log(bit);
        for (const mask of oxygen_masks) {
            if (mask[bit] == '0') {
                totals['0'] += 1;
            } else if (mask[bit] == '1') {
                totals['1'] += 1;
            }
        }
        console.log(totals);
        for (let i=0;i<oxygen_masks.length;i++){
            const mask = oxygen_masks[i];
            const max = totals['0'] > totals['1'] ? '0' : '1';
            if (mask[bit] == max) {
                continue;
            }
            oxygen_masks.splice(i,1);
            i-=1;
            if (oxygen_masks.length == 1) break;

        }
        console.log(oxygen_masks.join(', '));
        if (oxygen_masks.length == 1) break;
    }
    for (let bit=0;bit<first_mask.length;bit++) {
        let totals = {
            '0':0,
            '1': 0,
        }
        console.log(bit);
        for (const mask of co2_masks) {
            if (mask[bit] == '0') {
                totals['0'] += 1;
            } else if (mask[bit] == '1') {
                totals['1'] += 1;
            }
        }
        console.log(totals);
        for (let i=0;i<co2_masks.length;i++){
                const mask = co2_masks[i];
                let min = '0';
                if (totals['1'] < totals['0']) min = '1';
                if (mask[bit] == min) {
                    continue;
                }
                co2_masks.splice(i,1);
                i-=1;
                if (co2_masks.length == 1) break;

        }
        console.log(co2_masks.join(', '));
        if (co2_masks.length == 1) break;
    }
    console.log(parseInt(oxygen_masks,2)*parseInt(co2_masks,2))


} 