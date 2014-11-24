# Signature.js - overload methods in JavaScript
## Usage

You can include the `signature.js` as a `<script>` tag or a node.js `require()` call.

Create a function with `signature()` call, then you can `overload` it by passing the parameter types and the handler function.
```javascript
var add = signature();

add.overload(Number, Number, function(a, b) {
    return a + b;
});

add.overload(Array, Array, function(a, b) {
    return a.concat(b);
});

console.log(add(1, 2)); //3
console.log(add([1, 2], [3, 4])); //[1, 2, 3, 4]
```

You can create constructors as well.

```javascript
var Point = signature();

Point.overload(Number, Number, function (x, y) {
    this.x = x;
    this.y = y;
});

Point.overload(Point, function (p) {
    Point.call(this, p.x, p.y);
});

var p = new Point(1, 2);
var q = new Point(p);
console.log(p); //{x: 1, y: 2} 
console.log(q); //{x: 1, y: 2} 
```

Class methods:

```javascript
Point.prototype.move = signature();

Point.prototype.move.overload(Point, function (p) {
    this.x += p.x;
    this.y += p.y;
});

Point.prototype.move.overload(Number, Number, function (x, y) {
    this.move(new Point(x, y));
});

var a = new Point(10, 10);
a.move(new Point(4, 5));
a.move(6, 5);
console.log(a); //{x: 20, y: 20}
```

An error is thrown when there is no overloaded method for the arguments, but you can define a custom fallback.

```javascript
var subtract = signature();

subtract.overload(Number, Number, function(a, b) {
    return a + b;
});

var add = signature(function(a, b) { //default handler
    return a + b;
});
add.overload(Array,Array,function(a, b) {
    return a.concat(b);
});

console.log(add(1, 2)); //3 (default handler)
subtract('2','1'); //error (no default handler)
```