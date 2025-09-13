/******************************************************************************
Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
let md = [
    {mid: 6697, repl: 1},
  {mid: 897, repl: 2},
  {mid: 900, repl: 4},
   { mid: 90, repl: 433 },
   { mid: 899, repl: 902 },
   { mid: 902, repl: 644 },
   { mid: 644},
   { mid: 433, repl: 1 },
  { mid: 5, repl: 2 },
  { mid: 4, repl: 3 },
  { mid: 3, repl: 1 },
  { mid: 2, repl: 1 },
  { mid: 1 }
]

function getConvos(md) {
    let convos = {};
    let repls = {};
    let i = 0;
    for(let msg of md) {
        let classi = false;
        for(let k of Object.keys(convos)) {
            for(let cms of convos[k]) {
                if(('repl' in cms && cms.repl === msg.repl) || msg.mid === cms.repl) {
                    convos[k].push(msg);
                    classi = true;
                    break;
                }
            }
        }
        if(!classi && !(msg.mid in convos)) {
            convos[msg.mid] = [msg];
        }
        i++;
    }
    console.log(repls);
    return convos;
}

function combineConvos(convos) {
    let finalConvos = {};
    for(let k of Object.keys(convos)) {
        let conv = convos[k];
        let mainMid = null;
        for(let i = conv.length - 1; i >= 0; i--) {
            let msg = conv[i];
            mainMid = (mainMid === null)? msg.mid : mainMid;
            if(!(mainMid in finalConvos)) {
                finalConvos[mainMid] = [];
            }
            if(!finalConvos[mainMid].find(u => u.mid === msg.mid)) {
                finalConvos[mainMid].push(msg);
            }
        }
    }
    return finalConvos;
} 

let convos = getConvos(md);
console.log(combineConvos(convos));
