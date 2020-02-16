let total = 0;

/* ------------ CACHED ELEMENTS ----------- */

let input = document.querySelector('#newNumber');
let addNumber = document.querySelector('#add');
let minusNumber = document.querySelector('#minus');
let differrence = document.querySelector('#total');

/* ------------ EVENT ELEMENTS ----------- */

addNumber.addEventListener('click', add);
minusNumber.addEventListener('click', minus);

init();

function init(){
    differrence.innerHTML = 0;
    input.value = '1';
}

function add(){

    let newNumber = input.value;

    if(isNaN(newNumber)){
        input.value = '';
        return;
    }else{
        newNumber = parseInt(newNumber);
        
        total += newNumber;

        differrence.innerHTML = total;

        input.value = '';
    }

    if(Math.sign(differrence.innerHTML) === -1){
        differrence.style.cssText = "color:red;";
    }else if(Math.sign(differrence.innerHTML) === 1){
        differrence.style.cssText = "color:black;";
    }

}

function minus(){

    let newNumber = input.value;

    if(isNaN(newNumber)){
        input.value = '';
        return;
    }else{
        newNumber = parseInt(newNumber);

        total -= newNumber;

        differrence.innerHTML = total;

        input.value = '';
    }

    if(Math.sign(differrence.innerHTML) === -1){
        differrence.style.cssText = "color:red;";
    }else if(Math.sign(differrence.innerHTML) === 1){
        differrence.style.cssText = "color:black;";
    }

}