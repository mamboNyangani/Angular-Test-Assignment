export function counter(n ?: number) : any[] {
    if(!n) n= 0;
    return [
        function getA(){
            return n;
        }, 
        function nextA(){
            n++;
        }
    ]
}

const [getA, nextA] = counter(1);

getA();
console.log(getA());
console.log(nextA());
console.log(getA());

const [getB, nextB] = counter(10);

console.log(nextB());
console.log(getA());
console.log(getB());

console.log(nextA());
console.log(getA());
console.log(getB());





