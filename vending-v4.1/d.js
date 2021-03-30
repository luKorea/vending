let item = {
    id: Math.floor(Math.random() * 10),
    time: new Date().toLocaleDateString(),
    name: 'korea ' + Math.floor(Math.random() * 10)
},
    list = Array(5).fill(item);
console.log(list);
