//console.log(process.argv);

var length = process.argv.length;
var total = 0;
for(i = 2; i < length; i++){
    var arg = Number(process.argv[i]);
    total += arg;
}

console.log(total);