const openbtn_depo = document.getElementById("openbtn1");
const openbtn_rev = document.getElementById("openbtn2");
const closebtn = document.getElementById("closebtn");
const closebtn_rev = document.getElementById("closebtn_rev");
const popup_depo = document.getElementById("popup1");
const popup_rev = document.getElementById("popup2");
const submitbtn_depo = document.getElementById("submitbtn1"); 
const submitbtn_rev = document.getElementById("submitbtn2"); 
const amountinput_depo = document.getElementById("amountinput1"); 
const amountinput_rev = document.getElementById("amountinput2");
const balance_depo = document.getElementById("Deposit");
const balance_rev = document.getElementById("Revenus");
const sold = document.getElementById("sold")

let currentbalance_deposit = Number(balance_depo.innerText);
let currentbalance_revenus = Number(balance_rev.innerText);
let currentbalance_sold = Number(sold.innerText);


function close_depo() {
    popup1.classList.add("hidden");

}

function open_depo() {
    popup1.classList.remove("hidden");

}
function close_rev(){
popup2.classList.add("hidden");
}
function open_rev(){
popup2.classList.remove("hidden");
}

function amout_deposit() {
    let submit_amount_deposit = Number(amountinput_depo.value);
    currentbalance_deposit += submit_amount_deposit;
    balance_depo.textContent = currentbalance_deposit;
    popup1.classList.add("hidden");
        currentbalance_sold -= submit_amount_deposit;
    sold.textContent = currentbalance_sold;
}
function amout_revenus(){
    let submit_amount_revenus = Number(amountinput_rev.value);
    currentbalance_revenus += submit_amount_revenus;
    balance_rev.textContent = currentbalance_revenus;
    popup2.classList.add("hidden");
    currentbalance_sold += submit_amount_revenus;
    sold.textContent = currentbalance_sold;
}

openbtn_depo.addEventListener("click", open_depo);
openbtn_rev.addEventListener("click", open_rev);
closebtn.addEventListener("click", close_depo);
closebtn_rev.addEventListener("click",close_rev)
submitbtn_depo.addEventListener("click", amout_deposit);
submitbtn_rev.addEventListener("click",amout_revenus);
