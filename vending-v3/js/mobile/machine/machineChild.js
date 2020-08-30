import '../../../MyCss/mobile/machine/machineChild.scss'
console.log(1);
var parentWin = window.parent;
// console.log(parentWin)
$('.topHeader .back').click(function(){
    parentWin.hideChild();
})
