const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./keyword/化妝.json'))

function shuffle(arr) {

    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

const shuffled = shuffle(data)

for (let i = 0; i < 5; i++) {
    console.log(shuffled[i].title)
    console.log(shuffled[i].description)
}