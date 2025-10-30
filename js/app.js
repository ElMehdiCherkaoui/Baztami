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

const Description = document.getElementById("Description_popup");

const date = document.getElementById("date_popup");






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

function make_new_transaction_for_rev() {
    const transaction_rev = document.createElement("div");
    transaction_rev.innerHTML = `
    <div class="grid grid-cols-12 items-center gap-1">
      <img src="/images/wallet-icon.png" alt="" class="bg-green-600 rounded-md w-6 h-6 p-1 col-span-1" />
      <p class="col-span-4 text-sm text-white truncate">${Description.value}</p>
      <span class="col-span-2 text-xs font-semibold text-gray-300">${date.value}</span>

      <div class="flex items-center justify-end col-span-3 text-white">
        <p class="text-green-500 font-bold text-lg mr-1">+</p>
        <div class="font-bold text-lg">
          <span>${amountinput.value}</span><span>£</span>
        </div>
      </div>

      <div class="flex justify-end col-span-2 gap-1">
        <a href="#"><img src="/images/edit-icon.png" alt=""
          class="w-5 h-5 bg-yellow-500 rounded-md p-0.5 cursor-pointer hover:bg-yellow-600" id="edit_rev"/></a>
        <a href="#"><img src="/images/delete-icon.png" alt=""
          class="w-5 h-5 bg-red-500 rounded-md p-0.5 cursor-pointer hover:bg-red-600" id="delete_rev"/></a>
      </div>
    </div>
  `;
    const container_rev = document.getElementById("rev");
    container_rev.appendChild(transaction_rev);
}

function make_new_transaction_for_depo() {
    const transaction_depo = document.createElement("div");
    transaction_depo.innerHTML = `
    <div class="grid grid-cols-12 items-center gap-1">
      <img src="/images/house-icon.png" alt="" class="bg-red-600 rounded-md w-6 h-6 p-1 col-span-1" />

      <p class="col-span-4 text-sm text-white truncate">${Description.value}</p>
      <span class="text-xs col-span-2 font-semibold text-gray-300">${date.value}</span>

      <div class="flex items-center justify-end col-span-3 text-white">
        <p class="text-red-500 font-bold text-lg mr-1">-</p>
        <div class="font-bold text-lg">
          <span>${amountinput.value}</span><span>£</span>
        </div>
      </div>

      <div class="flex justify-end col-span-2 gap-1">
        <a href="#"><img src="/images/edit-icon.png" alt=""
          class="w-5 h-5 bg-yellow-500 rounded-md p-0.5 cursor-pointer hover:bg-yellow-600" /></a>
        <a href="#"><img src="/images/delete-icon.png" alt=""
          class="w-5 h-5 bg-red-500 rounded-md p-0.5 cursor-pointer hover:bg-red-600" /></a>
      </div>
    </div>
  `;
    const container_depo = document.getElementById("depo");
    container_depo.appendChild(transaction_depo);
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
        sold.innerText = currentbalance_sold;
        make_new_transaction_for_depo();
    } else if (type === "revenus") {
        currentbalance_revenus += amount;
        balance_rev.textContent = currentbalance_revenus;
        currentbalance_sold += amount;
        sold.innerText = currentbalance_sold;
        make_new_transaction_for_rev();
    }
    popup.classList.add("hidden");
    soldcolor();
}

open_btn.addEventListener("click", open_popup);
closebtn.addEventListener("click", close_popup);
submitbtn.addEventListener("click", submitamout);
