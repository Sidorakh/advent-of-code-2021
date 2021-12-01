const fs = require('fs');
const rl = require('readline-sync');
(async ()=>{
    const days = {};
    const files = fs.readdirSync('./').filter(v=>v.endsWith('.js') && !v.includes('app.js')).sort();
    while(true) {
        console.log(`0. Exit`);
        for (let i=0;i<files.length;i++) {
            days[files[i]] = require('./'+files[i]);
            console.log(`${i+1}. ${files[i]}`);
        }
        const num = rl.question('Day: ');
        if (num == 0) process.exit();
        await days[files[num-1]]();
    }
})()

