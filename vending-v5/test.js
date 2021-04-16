let arr = [1,2,3,4,5,6,7,8,9],
    arr1 = [99090];
arr1.forEach(item => {
    arr = [...arr,item];
})

console.log(arr);
