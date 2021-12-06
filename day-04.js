const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}

async function get_data() {
    const [numbers,...boards] = (await fs.readFile('./input-day-04.txt','utf8')).replaceAll('\r\n','\n').split('\n\n')
    console.log(numbers.length);
    console.log(boards.length);
    return [numbers.split(','),boards];
}

async function part_1() {
    const [numbers,board_data] = await get_data();
    const called = [];
    const boards = board_data.map(b=>new Board(b));
    let winner = null;
    for (const num of numbers) {
        called.push(num);
        winner = boards.find(board=>board.has_won(called));
        if (winner) {
            console.log('Score: ' + winner.score(called));
            return;
        }
    }
}

async function part_2() {
    const [numbers,board_data] = await get_data();
    const called = [];
    const boards = board_data.map(b=>new Board(b));
    let winner = null;
    for (const num of numbers) {
        called.push(num);
        for (let i=0;i<boards.length;i++) {
            if (boards[i].has_won(called)) {
                if (boards.length == 1) {
                    // found the final winner
                    console.log('Score: ' + boards[i].score(called));
                    return;
                } else {
                    boards.splice(i,1);
                    i-=1;
                }
            }
        }
    }
}











class Board {
    constructor (board_str) {
        this.board = board_str.split('\n').map(v=>v.split(/\s+/).filter(v=>v!=""));
    }
    check_rows(nums){
        return this.board.some(row=>row.every(num=>nums.includes(num)))
    }
    check_cols(nums) {
        for (let i=0;i<this.board.length;i++) {
            if (this.board.every(row=>nums.includes(row[i]))) { return true; }
        }
        return false;
    }
    has_won(nums) {
        return this.check_rows(nums) || this.check_cols(nums);
    }
    score(nums){
        let total = 0;
        console.log(this.board);
        for (const row of this.board) {
            row.forEach(v=>{
                if (!nums.includes(v)) total += parseInt(v);
            });
        }
        console.log(this.total)
        return total * parseInt(nums[nums.length-1]);
    }
}