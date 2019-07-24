class Person {
    constructor (name) {
        this.name = name;
    }
    hello() {
        if(typeof this.name === 'string'){
            return `Hello, I am ${this.name}!`;
        }else {
            return `Hello!`;
        }
    }
}

let person = new Person('Neo');
// var name = 'Jen Smith';

var greetHTML = templates['greeting']({
    message: person.hello()
});
// console.log();
document.write(greetHTML);