var signature = require('./signature');

//var Point = function (x, y) {
//    this.x = x;
//    this.y = y;
//};

var Point = signature();

Point.overload(Number, Number, function (x, y) {
    this.x = x;
    this.y = y;
});

Point.overload(Point, function (p) {
    Point.call(this, p.x, p.y);
});

Point.prototype.move = signature();

Point.prototype.move.overload(Point, function (p) {
    this.x += p.x;
    this.y += p.y;
});

Point.prototype.move.overload(Number, Number, function (x, y) {
    this.move(new Point(x, y));
});

Point.prototype.move.overload(String, Number, function (s, n) {
    var p = new Point(0, 0);
    p[s] = n;
    this.move(p);
});

Point.prototype.move.overload(null, function (nu) {
    return nu;
});

Point.prototype.move.overload(undefined, function (undef) {
    return undef;
});

Point.prototype.move.overload(Array, function (x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
});

Point.prototype.move.overload(Object, Object, Object, Object, Object, function (o1, o2, o3, o4, o5) {
    return 5;
});

var x = new Point(10, 10);
var a = new Point(x);

a.move(new Point(4, 5));
console.log(a.x === 14);
console.log(a.y === 15);
a.move(6, 5);
console.log(a.x === 20);
console.log(a.y === 20);
try {
    a.move(1);
    console.log(false);
} catch (e) {
    console.log(true);
}
a.move("x", 2);
console.log(a.x === 22);

console.log(a.move(null) === null);
console.log(a.move(undefined) === undefined);
console.log(a.move([1, 2, 3]) === 6);

console.log(a.move(1, true, "x", null, undefined) === 5);