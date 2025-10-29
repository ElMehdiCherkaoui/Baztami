const closebtn = document.getElementById("closebtn");

const popup = document.getElementById("popup");

const submitbtn = document.getElementById("submitbtn");

const amountinput = document.getElementById("amountinput");

const balance_depo = document.getElementById("Deposit");

const type_select = document.getElementById("typeselect");

const balance_rev = document.getElementById("Revenus");

const sold = document.getElementById("sold");

const open_btn = document.getElementById("add");
const sign = document.getElementById("sign");

let currentbalance_deposit = Number(balance_depo.innerText);
let currentbalance_revenus = Number(balance_rev.innerText);
let currentbalance_sold = Number(sold.innerText);


function soldcolor() {
    if (currentbalance_sold < 0) {
        sold.classList.remove("text-green-400");
        sold.classList.add("text-red-600");
    } else if (currentbalance_sold > 0) {
        sold.classList.remove("text-red-600");
        sold.classList.add("text-green-400");
    } else {
        sold.classList.remove("text-red-600", "text-green-400");
    }
}


function close_popup() {
    popup.classList.add("hidden");
}

function open_popup() {
    popup.classList.remove("hidden");
}

function submitamout() {
    const amount = Number(amountinput.value);
    const type = type_select.value;
    if (type === "deposite") {
        currentbalance_deposit += amount;
        balance_depo.textContent = currentbalance_deposit;
        currentbalance_sold -= amount;
        sold.innerText = currentbalance_sold
    } else if (type === "revenus") {
        currentbalance_revenus += amount;
        balance_rev.textContent = currentbalance_revenus;
        currentbalance_sold += amount;
        sold.innerText = currentbalance_sold
    }
    popup.classList.add("hidden");
    soldcolor();
}

open_btn.addEventListener("click", open_popup);
closebtn.addEventListener("click", close_popup);
submitbtn.addEventListener("click", submitamout);
