const fs = require('fs-extra');
const rl = require('readline-sync');
module.exports = async()=>{
    const num = rl.question('Part 1 or 2: ');
    if (num == 1) return await part_1();
    if (num == 2) return await part_2();
}

function stringify_map(map) {
    const lines = [];
    for (let y=0;y<=map['.height'];y++) {
        let line = '';
        for (let x=0;x<=map['.width'];x++) {
            line += (map[`${x}-${y}`] || 0);
            if (x < map['.width']) line += ' ';
        }
        lines.push(line);
    }
    return lines;
}

function create_line(x1,y1,x2,y2) {
    return {
        a: {
            x: x1,
            y: y1,
        },
        b: {
            x: x2,
            y: y2,
        },
        points() {
            const pts = [];
            if (this.a.x == this.b.x) {
                const y1 = Math.min(this.a.y,this.b.y);
                const y2 = Math.max(this.a.y,this.b.y);
                for (let y=y1;y<=y2;y++) {
                    pts.push({x: this.a.x,y});
                }
            } else if (this.a.y == this.b.y) {
                const x1 = Math.min(this.a.x,this.b.x);
                const x2 = Math.max(this.a.x,this.b.x);
                for (let x=x1;x<=x2;x++) {
                    pts.push({x,y:this.a.y});
                }
            } else {
                const x1 = this.a.x;
                const x2 = this.b.x;
                const xo = Math.sign(this.b.x-this.a.x);
                const y1 = this.a.y;
                const y2 = this.b.y;
                const yo = Math.sign(this.b.y-this.a.y);
                const num = Math.abs(x2-x1);
                for (let i=0;i<=num;i++) {
                    const x = x1 + xo*i;
                    const y = y1 + yo*i;
                    pts.push({x,y})
                }
            }

            return pts;
        },
        direction() {
            if (this.a.x == this.b.x) {
                return 'vertical'
            }
            if (this.a.y == this.b.y) {
                return 'horizontal'
            }
            return 'diagonal';
        }
    }
}

async function part_1() {
    const map = {};
    const input = (await fs.readFile('./input-day-05.txt','utf8')).split('\n').map(v=>v.trim()).map(v=>v.split('->').map(v=>v.split(',').map(v=>parseInt(v))));
    let lines = [];
    let max_x = 0;
    let max_y = 0;
    for (const line of input) {
        console.log(line);
        if (line[0][0] > max_x) max_x = line[0][0];
        if (line[0][1] > max_y) max_y = line[0][1];
        if (line[1][0] > max_x) max_x = line[1][0];
        if (line[1][1] > max_y) max_y = line[1][1];
        lines.push(create_line(line[0][0],line[0][1],line[1][0],line[1][1]));
    }
    lines = lines.filter(line=>(line.a.x == line.b.x || line.a.y == line.b.y));

    console.log(lines,max_x,max_y);

    map['.width'] = max_x;
    map['.height'] = max_y;
    
    for (let x=0;x<=max_x;x++) {
        for (let y=0;y<=max_y;y++) {
            map[`${x}-${y}`] = 0;
        }
    }
    console.log(stringify_map(map).join('\n') + '\n\n\n');
    for (const line of lines) {
        const points = line.points();
        for (const point of points) {
            map[`${point.x}-${point.y}`] += 1;
        }
        
    }
    console.log(stringify_map(map).join('\n'));
    console.log('Finding points with 2 or more vents');
    let num = 0;
    for (let x=0;x<=map['.width'];x++) {
        for (let y=0;y<=map['.height'];y++) {
            if (map[`${x}-${y}`] > 1) {
                num++;
            }
        }
    }
    console.log(num + ' points');
}

async function part_2() {
    const map = {};
    const input = (await fs.readFile('./input-day-05.txt','utf8')).split('\n').map(v=>v.trim()).map(v=>v.split('->').map(v=>v.split(',').map(v=>parseInt(v))));
    let lines = [];
    let max_x = 0;
    let max_y = 0;
    for (const line of input) {
        console.log(line);
        if (line[0][0] > max_x) max_x = line[0][0];
        if (line[0][1] > max_y) max_y = line[0][1];
        if (line[1][0] > max_x) max_x = line[1][0];
        if (line[1][1] > max_y) max_y = line[1][1];
        lines.push(create_line(line[0][0],line[0][1],line[1][0],line[1][1]));
    }

    console.log(lines,max_x,max_y);

    map['.width'] = max_x;
    map['.height'] = max_y;
    
    for (let x=0;x<=max_x;x++) {
        for (let y=0;y<=max_y;y++) {
            map[`${x}-${y}`] = 0;
        }
    }
    for (const line of lines) {
        const points = line.points();
        for (const point of points) {
            map[`${point.x}-${point.y}`] += 1;
        }
        //console.log(points.map(v=>`(${v.x},${v.y})`).join(','));
        //console.log(stringify_map(map).join('\n') + '\n\n\n');
    }
    //console.log(stringify_map(map).join('\n'));
    console.log('Finding points with 2 or more spaces');
    let num = 0;
    for (let x=0;x<=map['.width'];x++) {
        for (let y=0;y<=map['.height'];y++) {
            if (map[`${x}-${y}`] > 1) {
                num++;
            }
        }
    }
    console.log(num + ' points');
}