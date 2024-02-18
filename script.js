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

    
    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));

function createUserAccount() {

    bankAccounts.usrName = window.prompt("Enter the username ");
    bankAccounts.usrPass = window.prompt("Enter the password ");
    bankAccounts.name = window.prompt("Enter the name of the user ");
    bankAccounts.acccountNo = window.prompt("Enter the account number ");
    bankAccounts.ifcCode = window.prompt("Enter the ifc code ");
    bankAccounts.branchName = window.prompt("Enter the branch name ");
    bankAccounts.balanceAmount = "0";
    bankAccounts.usrAddress.houseName = window.prompt("Enter the house name ");
    bankAccounts.usrAddress.place = window.prompt("Enter the place ");
    bankAccounts.usrAddress.postOffice = window.prompt("Enter the postOffice ");
    bankAccounts.usrAddress.pinCode = window.prompt("Enter the pin code ");
    bankAccounts.usrLoggedIn = true;
    
    console.log(bankAccounts);
    localStorage.setItem("CurrentUser", JSON.stringify(bankAccounts));

    document.querySelector('.create-btn').classList.add('hidden');

}

bankAccounts = JSON.parse(localStorage.getItem("CurrentUser"));

function getAccountDetails() {


    console.log(bankAccounts);

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

function deposit() {

    let Depamount = window.prompt("Enter the amount to deposit");

    let numBalance = Number(bankAccounts.balanceAmount);

    numBalance += Number(Depamount);

    bankAccounts.balanceAmount = numBalance.toString();

    let newTransaction = getNewTransactionObject(Depamount, 'deposit');

    bankAccounts.transactionHistory.push(newTransaction);

    localStorage.setItem("UserDetails", JSON.stringify(bankAccounts));

}

function withdraw() {

    let Withamount = window.prompt("Enter the amount to withdraw");

    let numBalance = Number(bankAccounts.balanceAmount);

    if (numBalance < Withamount) {

        window.alert("Insufficient balance. Re-Enter the value");
        withdraw();
    }

    numBalance -= Number(Withamount);

    bankAccounts.balanceAmount = numBalance.toString();

    let newTransaction = getNewTransactionObject(Withamount, 'withdraw');

    bankAccounts.transactionHistory.push(newTransaction);

    localStorage.setItem("UserDetails", JSON.stringify(bankAccounts));
}

function viewBalance() {

    window.alert((bankAccounts.balanceAmount));
}

