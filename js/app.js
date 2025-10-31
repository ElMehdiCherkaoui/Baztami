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

const edit_popup = document.getElementById("popup_edit");

const edit_amountinput = document.getElementById("amountinput_edit");

const edit_Description = document.getElementById("Description_popup_edit");

const edit_closebtn = document.getElementById("closebtn_edit");

const submitbtn_edit = document.getElementById("submitbtn_edit");

const edit_btn = document.getElementsByClassName("edit-btn");

const delete_btn = document.getElementsByClassName("delete_btn");




let currentbalance_deposit = Number(balance_depo.innerText);

let currentbalance_revenus = Number(balance_rev.innerText);

let currentbalance_sold = Number(sold.innerText);

let current_transaction = null;

let transactions = [];


function soldcolor() {
  if (currentbalance_sold < 0) {
    sold.classList.remove("text-green-400");
    sold.classList.add("text-red-600");
  }
  else if (currentbalance_sold > 0) {
    sold.classList.remove("text-red-600");
    sold.classList.add("text-green-400");
  }
  else {
    sold.classList.remove("text-red-600", "text-green-400");
  }
}

function saveData() {
  const data = {
    deposit: currentbalance_deposit,
    revenus: currentbalance_revenus,
    sold: currentbalance_sold,
    transactions: transactions
  };
  localStorage.setItem("Data_structur", JSON.stringify(data));
}

function updateUI() {
  let totalDeposit = 0;
  let totalRevenue = 0;

  transactions.forEach(t => {
    if (t.type === "deposite") {
      totalDeposit += Number(t.amount);
    }

    if (t.type === "revenue") {
      totalRevenue += Number(t.amount);
    }
  });

  currentbalance_deposit = totalDeposit;
  currentbalance_revenus = totalRevenue;
  currentbalance_sold = totalRevenue - totalDeposit;

  balance_depo.textContent = currentbalance_deposit;
  balance_rev.textContent = currentbalance_revenus;
  sold.textContent = currentbalance_sold;

  localStorage.setItem("Data_structur", JSON.stringify({
    deposit: currentbalance_deposit,
    revenus: currentbalance_revenus,
    sold: currentbalance_sold,
    transactions: transactions
  }));

  soldcolor();
}

function loadData() {
  const saved = localStorage.getItem("Data_structur");

  if (saved) {
    const data = JSON.parse(saved);
    currentbalance_deposit = data.deposit;
    currentbalance_revenus = data.revenus;
    currentbalance_sold = data.sold;
    transactions = data.transactions;


    balance_depo.textContent = currentbalance_deposit;
    balance_rev.textContent = currentbalance_revenus;
    sold.textContent = currentbalance_sold;
    soldcolor();


    transactions.forEach(t => {
      Description.value = t.description;
      amountinput.value = t.amount;
      date.value = t.date;
      if (t.type === "revenus") {
        make_new_transaction_for_rev();
      } else {
        make_new_transaction_for_depo();
      }
    });
  }
}
window.addEventListener("load", loadData);


function make_new_transaction_for_rev() {
  const transaction_rev = document.createElement("div");
  transaction_rev.innerHTML = `
    <div class="transaction-content grid grid-cols-12 items-center gap-1" id="only_rev">
      <img src="/images/wallet-icon.png" alt="" class="bg-green-600 rounded-md w-6 h-6 p-1 col-span-1" />
      <p class="col-span-4 text-sm text-white truncate description-edit">${Description.value}</p>
      <span class="col-span-2 text-xs font-semibold text-gray-300">${date.value}</span>
      <div class="flex items-center justify-end col-span-3 text-white">
        <p class="text-green-500 font-bold text-lg mr-1">+</p>
        <div class="font-bold text-lg">
          <span class="amount-edit">${amountinput.value}</span><span>£</span>
        </div>
      </div>
      <div class="flex justify-end col-span-2 gap-1">
        <img src="/images/edit-icon.png" alt=""
          class="edit_btn w-5 h-5 bg-yellow-500 rounded-md p-0.5 cursor-pointer hover:bg-yellow-600"/>
        <img src="/images/delete-icon.png" alt=""
          class="delete_btn w-5 h-5 bg-red-500 rounded-md p-0.5 cursor-pointer hover:bg-red-600"/>
      </div>
    </div>
  `;
  const container_rev = document.getElementById("rev");
  container_rev.appendChild(transaction_rev);
}



function make_new_transaction_for_depo() {
  const transaction_depo = document.createElement("div");
  transaction_depo.innerHTML = `
    <div class="transaction-content grid grid-cols-12 items-center gap-1" id="only_depo">
      <img src="/images/house-icon.png" alt="" class="bg-red-600 rounded-md w-6 h-6 p-1 col-span-1" />
      <p class="col-span-4 text-sm text-white truncate description-edit">${Description.value}</p>
      <span class="text-xs col-span-2 font-semibold text-gray-300">${date.value}</span>
      <div class="flex items-center justify-end col-span-3 text-white">
        <p class="text-red-500 font-bold text-lg mr-1">-</p>
        <div class="font-bold text-lg">
          <span class="amount-edit">${amountinput.value}</span><span>£</span>
        </div>
      </div>
      <div class="flex justify-end col-span-2 gap-1">
        <img src="/images/edit-icon.png" alt=""
          class="edit_btn w-5 h-5 bg-yellow-500 rounded-md p-0.5 cursor-pointer hover:bg-yellow-600"/>
        <img src="/images/delete-icon.png" alt=""
          class="delete_btn w-5 h-5 bg-red-500 rounded-md p-0.5 cursor-pointer hover:bg-red-600"/>
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



function close_popup_edit() {
  edit_popup.classList.add("hidden");
}



function open_popup_edit() {
  edit_popup.classList.remove("hidden");
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
  }
  else if (type === "revenus") {
    currentbalance_revenus += amount;
    balance_rev.textContent = currentbalance_revenus;
    currentbalance_sold += amount;
    sold.innerText = currentbalance_sold;
    make_new_transaction_for_rev();
  }
  popup.classList.add("hidden");
  soldcolor();

  transactions.push({
    type: type_select.value,
    description: Description.value,
    amount: Number(amountinput.value),
    date: date.value
  });
  saveData();
  amountinput.value = "";
  Description.value = "";
  date.value = "";
}






open_btn.addEventListener("click", open_popup);
closebtn.addEventListener("click", close_popup);
submitbtn.addEventListener("click", submitamout);
edit_closebtn.addEventListener("click", close_popup_edit);


document.addEventListener("click", (e) => {
  const edit_btn = e.target.closest(".edit_btn");
  if (edit_btn) {
    current_transaction = edit_btn.closest(".transaction-content");
    checkout_type = edit_btn.closest("#only_depo") || edit_btn.closest("#only_rev");
    document.getElementById("Description_popup_edit").value =
      current_transaction.querySelector(".description-edit").textContent;
    document.getElementById("amountinput_edit").value =
      current_transaction.querySelector(".amount-edit").textContent;
    const oldm = Number(document.getElementById("amountinput_edit").value);
    localStorage.setItem("oldamountR", JSON.stringify(oldm));
    document.getElementById("popup_edit").classList.remove("hidden");
  }
});

submitbtn_edit.addEventListener("click", () => {
  const newdescription = document.getElementById("Description_popup_edit").value;
  const newamount = Number(document.getElementById("amountinput_edit").value);
  const oldamount = JSON.parse(localStorage.getItem("oldamountR"));

  current_transaction.querySelector(".description-edit").textContent = newdescription;
  current_transaction.querySelector(".amount-edit").textContent = newamount;

  if (checkout_type && checkout_type.id === "only_depo") {
    currentbalance_deposit = currentbalance_deposit - oldamount + newamount;
    balance_depo.textContent = currentbalance_deposit;
  }
  if (checkout_type && checkout_type.id === "only_rev") {
    currentbalance_revenus = currentbalance_revenus - oldamount + newamount;
    balance_rev.textContent = currentbalance_revenus;
  }
  currentbalance_sold = currentbalance_revenus - currentbalance_deposit;
  sold.textContent = currentbalance_sold;
  document.getElementById("popup_edit").classList.add("hidden");

  saveData()
});




document.addEventListener("click", (e) => {

  if (e.target.closest(".delete_btn")) {

    const transaction = e.target.closest(".transaction-content");
    if (transaction) {
      const confirmation = confirm("are you sure you want to delete this ? :")
      if (confirmation) {
        transaction.remove();
        const description = transaction.querySelector(".description-edit").textContent;
        const amount = Number(transaction.querySelector(".amount-edit").textContent);
        transactions = transactions.filter(
          (t) => !(t.description === description && t.amount === amount)
        );
        saveData();
updateUI()

      }
    }
  }
});


