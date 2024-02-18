
// Bank accounts object with user information
var bankAccounts = 
    {
        usrLoggedIn: false,
        usrName : null,
        usrPass : null,
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
    bankAccounts.usrName = document.getElementById('usrName').value;
    bankAccounts.usrPass = document.getElementById('usrPass').value;
    bankAccounts.name = document.getElementById('Name').value;
    bankAccounts.acccountNo = document.getElementById('AccNo').value;
    bankAccounts.ifcCode = document.getElementById('ifcCode').value;
    bankAccounts.branchName = document.getElementById('branchName').value;
    bankAccounts.usrAddress.houseName = document.getElementById('houseName').value;
    bankAccounts.usrAddress.place = document.getElementById('place').value;
    bankAccounts.usrAddress.postOffice = document.getElementById('postOf').value;
    bankAccounts.usrAddress.pinCode = document.getElementById('pinCode').value.toString();
    bankAccounts.balanceAmount = "0";
 
    console.log(bankAccounts);
    // Save user details to localStorage
    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));
    // Check if user is created and update UI
    checkUserCreated();
}

checkUserCreated();

// Function to check if a user is already created
function checkUserCreated(){

    var storedUser = JSON.parse(localStorage.getItem("CurrentUser"));

    if(storedUser){

        console.log("User created!");
        bankAccounts = storedUser;
        bankAccounts.usrLoggedIn = true;

        // Show relevant UI elements

        //unhide all buttons

        const buttons = document.querySelector('.buttons');

        buttons.classList.remove('hidden');

        document.getElementById('create-form').classList.add('hidden');
        
        //hide create account button

        document.querySelector('.create-btn').classList.add('hidden');

        //unhide delete account button 

        document.querySelector('.delete-btn').classList.remove('hidden');

        
    }
}



// Function to create a new transaction object
function getNewTransactionObject(newAmount, tranMethod) {

    const date = new Date;

    const newTransaction = {
        dateTime: {
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            time: `${date.getFullYear()}`
        },
        method: tranMethod,
        amount: newAmount
    };

    return newTransaction;
}

// Function to hide all functional forms
function hideAllFuncForm(){

    const funForms = document.querySelectorAll('.func-form');

    funForms.forEach((form)=>{

        if(!form.classList.contains('hidden')){
            form.classList.add('hidden');
        }

    });
}

// Functions to show specific functional forms
function showDeposit(){

    hideAllFuncForm();

    document.getElementById('deposit-form').classList.remove('hidden');

}

function showWithdraw(){

    hideAllFuncForm();

    document.getElementById('withdraw-form').classList.remove('hidden');

}

function viewBalance() {

    hideAllFuncForm();

    document.querySelector('.balAmount').innerText = bankAccounts.balanceAmount;
    document.getElementById('view-bal').classList.remove('hidden');
    
}

function getAccountDetails() {

    console.log(bankAccounts);

    hideAllFuncForm();
    document.getElementById('view-details').classList.remove('hidden');


     // Update form fields with user account details
    document.getElementById('usrNameText').value = bankAccounts.usrName; 
    document.getElementById('NameText').value = bankAccounts.name 
    document.getElementById('AccNoText').value = bankAccounts.acccountNo 
    document.getElementById('ifcCodeText').value = bankAccounts.ifcCode 
    document.getElementById('branchNameText').value = bankAccounts.branchName  
    document.getElementById('houseNameText').value = bankAccounts.usrAddress.houseName 
    document.getElementById('placeText').value = bankAccounts.usrAddress.place
    document.getElementById('postOfText').value = bankAccounts.usrAddress.postOffice 
    document.getElementById('pinCodeText').value = bankAccounts.usrAddress.pinCode 


}

// Deposit function
function deposit() {

    let Depamount = document.getElementById('depAmount').value;

    let numBalance = Number(bankAccounts.balanceAmount);

    numBalance += Number(Depamount);

    bankAccounts.balanceAmount = numBalance.toString();

      // creating new object 
    let newTransaction = getNewTransactionObject(Depamount, 'deposit');

    
    // add new transactionHistory 
    bankAccounts.transactionHistory.push(newTransaction);

        // update local storage 
    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));

        // clear input value after clicking 
    document.getElementById('depAmount').value = '';

    window.alert(`${Depamount} deposited`);

}

// Withdraw function
function withdraw() {

    let Withamount = document.getElementById('withAmount').value;

    let numBalance = Number(bankAccounts.balanceAmount);

    if (numBalance < Withamount) {

        window.alert("Insufficient balance. Re-Enter the value");
    }

    numBalance -= Number(Withamount);

    bankAccounts.balanceAmount = numBalance.toString();

    
    // creating new object 
    let newTransaction = getNewTransactionObject(Withamount, 'withdraw');

    // add new transactionHistory 

    bankAccounts.transactionHistory.push(newTransaction);

    // update local storage 

    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));

    // clear input value after clicking 

    document.getElementById('withAmount').value = '';



    window.alert(`${Withamount} withdrawed`);
}

function DeleteUserAccount(){

    // clear local storage 

    localStorage.clear();

    // reload window 

    window.location.reload()
}