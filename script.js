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

    

function createUserAccount() {


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
    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));
    checkUserCreated();
}

checkUserCreated();

function checkUserCreated(){

    var storedUser = JSON.parse(localStorage.getItem("CurrentUser"));

    if(storedUser){

        console.log("User created!");
        bankAccounts = storedUser;
        bankAccounts.usrLoggedIn = true;

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

function hideAllFuncForm(){

    const funForms = document.querySelectorAll('.func-form');

    funForms.forEach((form)=>{

        if(!form.classList.contains('hidden')){
            form.classList.add('hidden');
        }

    });
}

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


function deposit() {

    let Depamount = document.getElementById('depAmount').value;

    let numBalance = Number(bankAccounts.balanceAmount);

    numBalance += Number(Depamount);

    bankAccounts.balanceAmount = numBalance.toString();

    let newTransaction = getNewTransactionObject(Depamount, 'deposit');

    bankAccounts.transactionHistory.push(newTransaction);

    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));

    window.alert(`${Depamount} deposited`);

}

function withdraw() {

    let Withamount = document.getElementById('withAmount').value;

    let numBalance = Number(bankAccounts.balanceAmount);

    if (numBalance < Withamount) {

        window.alert("Insufficient balance. Re-Enter the value");
        withdraw();
    }

    numBalance -= Number(Withamount);

    bankAccounts.balanceAmount = numBalance.toString();

    let newTransaction = getNewTransactionObject(Withamount, 'withdraw');

    bankAccounts.transactionHistory.push(newTransaction);

    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));
    

    console.log(`${Withamount} withdrawed`);
}

function DeleteUserAccount(){

    localStorage.clear();
    window.location.reload()
}