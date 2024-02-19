// Bank accounts object with user information
var bankAccounts = {
    usrLoggedIn: false,
    usrName: null,
    usrPass: null,
    name: null,
    acccountNo: null,
    ifcCode: null,
    branchName: null,
    balanceAmount: null,
    transactionHistory: [],
    profileImg: null,
    usrAddress: {
        houseName: null,
        place: null,
        postOffice: null,
        pinCode: null
    }
}

// User creation function
function createUserAccount() {
    // Retrieve user input and store it in the bankAccounts object
    bankAccounts.usrName = document.getElementById('usrName').value
    bankAccounts.usrPass = document.getElementById('usrPass').value
    bankAccounts.name = document.getElementById('Name').value
    bankAccounts.acccountNo = document.getElementById('AccNo').value
    bankAccounts.ifcCode = document.getElementById('ifcCode').value
    bankAccounts.branchName = document.getElementById('branchName').value
    bankAccounts.usrAddress.houseName = document.getElementById('houseName').value
    bankAccounts.usrAddress.place = document.getElementById('place').value
    bankAccounts.usrAddress.postOffice = document.getElementById('postOf').value
    bankAccounts.usrAddress.pinCode = document
        .getElementById('pinCode')
        .value.toString()
    bankAccounts.balanceAmount = '0'

    console.log(bankAccounts)
    // Save user details to localStorage
    localStorage.setItem('CurrentUser', JSON.stringify(bankAccounts))
    // Check if user is created and update UI
    checkUserCreated()
}

checkUserCreated()

// Function to check if a user is already created
function checkUserCreated() {
    var storedUser = JSON.parse(localStorage.getItem('CurrentUser'))

    if (storedUser) {
        console.log('User created!')
        bankAccounts = storedUser
        bankAccounts.usrLoggedIn = true

        // Show relevant UI elements

        //unhide all buttons

        const buttons = document.querySelector('.buttons')

        buttons.classList.remove('hidden')

        document.getElementById('create-form').classList.add('hidden')

        //hide create account button

        document.querySelector('.create-btn').classList.add('hidden')

        //unhide delete account button

        document.querySelector('.delete-btn').classList.remove('hidden')
    }
}

// Function to create a new transaction object
function getNewTransactionObject(newAmount, tranMethod) {
    const date = new Date()

    const newTransaction = {
        dateTime: {
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            time: `${date.getHours()}:${date.getMinutes()}`
        },
        method: tranMethod,
        amount: newAmount
    }

    return newTransaction
}

// Function to hide all functional forms
function hideAllFuncForm() {
    const funForms = document.querySelectorAll('.func-form')

    funForms.forEach(form => {
        if (!form.classList.contains('hidden')) {
            form.classList.add('hidden')
        }
    })
}

// Functions to show specific functional forms
function showDeposit() {
    hideAllFuncForm()

    document.getElementById('deposit-form').classList.remove('hidden')
}

function showWithdraw() {
    hideAllFuncForm()

    document.getElementById('withdraw-form').classList.remove('hidden')
}

function viewBalance() {
    hideAllFuncForm()

    document.querySelector('.balAmount').innerText = bankAccounts.balanceAmount
    document.getElementById('view-bal').classList.remove('hidden')
}


function showTransactionHistory() {

    hideAllFuncForm()

    document.getElementById('transaction-hist').classList.remove('hidden')

    if (bankAccounts.transactionHistory.length == 0) {

        document.querySelector('.no-transac-text').classList.remove('hidden');

    } else {

        document.querySelector('.no-transac-text').classList.add('hidden');

        document.querySelector('.transactions-container').innerHTML = '';

        const transactions = bankAccounts.transactionHistory.slice().reverse().map((transaction) => {

            console.log(transaction);

            let newTransaction = document.createElement('div');

            newTransaction.classList.add('flex');
            newTransaction.classList.add('justify-center');

            const color = (transaction.method == "deposit") ? "green-600" : "red-600";

            newTransaction.innerHTML = `

            <div
                    class="bg-slate-800 w-full h-30 py-2 px-3 rounded-xl border-r-8 border-${color} flex items-center justify-between max-w-[600px]">

                    <div class="flex items-center gap-x-5">

                        <!-- svg-->

                        <div class="grid place-content-center bg-${color} w-10 h-10 rounded-full">

                            <svg class="w-7 stroke-current text-slate-200 " viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M14.5 9.08333L14.3563 8.96356C13.9968 8.66403 13.5438 8.5 13.0759 8.5H10.75C9.7835 8.5 9 9.2835 9 10.25V10.25C9 11.2165 9.7835 12 10.75 12H13.25C14.2165 12 15 12.7835 15 13.75V13.75C15 14.7165 14.2165 15.5 13.25 15.5H10.412C9.8913 15.5 9.39114 15.2969 9.01782 14.934L9 14.9167"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 8L12 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 17V16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>

                        <!-- amount  -->

                        <h1 class="text-white font-black lg:text-lg">₹ ${transaction.amount}</h1>

                    </div>

                    <!-- date and time  -->

                    <div class="grid place-items-end text-slate-500 text-xs lg:text-lg">

                        <!-- time -->

                        <p>${transaction.dateTime.time}</p>

                        <!-- date -->

                        <p>${transaction.dateTime.date}</p>



                    </div>

            </div>
            `;

            document.querySelector('.transactions-container').appendChild(newTransaction);

        });


    }

}

function getAccountDetails() {
    console.log(bankAccounts)

    hideAllFuncForm()
    document.getElementById('view-details').classList.remove('hidden')

    // Update form fields with user account details
    document.getElementById('usrNameText').value = bankAccounts.usrName
    document.getElementById('NameText').value = bankAccounts.name
    document.getElementById('AccNoText').value = bankAccounts.acccountNo
    document.getElementById('ifcCodeText').value = bankAccounts.ifcCode
    document.getElementById('branchNameText').value = bankAccounts.branchName
    document.getElementById('houseNameText').value =
        bankAccounts.usrAddress.houseName
    document.getElementById('placeText').value = bankAccounts.usrAddress.place
    document.getElementById('postOfText').value =
        bankAccounts.usrAddress.postOffice
    document.getElementById('pinCodeText').value = bankAccounts.usrAddress.pinCode
}

// Deposit function
function deposit() {
    let Depamount = document.getElementById('depAmount').value

    let numBalance = Number(bankAccounts.balanceAmount)

    numBalance += Number(Depamount)

    bankAccounts.balanceAmount = numBalance.toString()

    // creating new object
    let newTransaction = getNewTransactionObject(Depamount, 'deposit')

    // add new transactionHistory
    bankAccounts.transactionHistory.push(newTransaction)

    // update local storage
    localStorage.setItem('CurrentUser', JSON.stringify(bankAccounts))

    // clear input value after clicking
    document.getElementById('depAmount').value = ''

    window.alert(`${Depamount} deposited`)
}

// Withdraw function
function withdraw() {
    let Withamount = document.getElementById('withAmount').value

    let numBalance = Number(bankAccounts.balanceAmount)

    if (numBalance < Withamount) {
        window.alert('Insufficient balance. Re-Enter the value')
    } else {

        numBalance -= Number(Withamount)

        bankAccounts.balanceAmount = numBalance.toString()

        // creating new object
        let newTransaction = getNewTransactionObject(Withamount, 'withdraw')

        // add new transactionHistory

        bankAccounts.transactionHistory.push(newTransaction)

        // update local storage

        localStorage.setItem('CurrentUser', JSON.stringify(bankAccounts))

        // clear input value after clicking


        window.alert(`${Withamount} withdrawed`)
    }
    document.getElementById('withAmount').value = ''
}

function DeleteUserAccount() {
    // clear local storage

    localStorage.clear()

    // reload window

    window.location.reload()
}
