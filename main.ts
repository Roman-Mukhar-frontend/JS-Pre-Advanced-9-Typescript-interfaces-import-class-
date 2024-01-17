// Потрібно реалізувати функціонал як на відео UserList, а саме:
// 1. При кліку на кнопку Add user запускаєте функцію addUser() яка робить наступне:
// Стягуєте дані з полів і формує об’єкт.
// Цей об’єкт пушитю в масив.
// Поля зачищає.
// Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.
// 2. При кліку на кнопку Delete запускаєте функцію deleteUser() яка робить наступне:
// Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// По цьому індексу видаляємо елемент з масиву.
// Запускаєм заново функцію render().
// 3. При кліку на кнопку Edit запускаєте функцію editUser() яка робить наступне:
// Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
// З об’єкт достаємо дані і передаємо в форму(тобто у value інпутів).
// Запам’ятовуємо даний індекс в змінну userIndex.
// Показуємо кнопку Edit user і приховуємо Add user.
// 4. При кліку на кнопку Edit User запускаєте функцію saveEditUser() яка робить наступне:
// Стягуєте дані з полів і формує об’єкт через клас.
// Цей об’єкт додається на місце старого об’єкту через userIndex.
// Поля зачищає.
// Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.

let checkLogin: boolean;
let checkpassword: boolean;
let checkEmail: boolean;
let checkAllData: boolean;
let userLogin = document.getElementById('login') as HTMLInputElement;
let userPassword = document.getElementById('password') as HTMLInputElement;
let userEmail = document.getElementById('email') as HTMLInputElement;
let userArr: Array<User> = [];
let form = document.forms[0] as HTMLFormElement;
let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody')[0];
let userIndex: number;
class User {
    constructor(public login: string, public password: string, public email: string) { }
}

// CHECK DATA
function checkData(): void {
    checkLogin = (/^[a-zA-Z]{1,16}$/).test(userLogin.value);
    checkpassword = (/^[\w-._]{1,16}$/).test(userPassword.value);
    checkEmail = (/^[\w.-]+@[\w.]+$/).test(userEmail.value);
    // if(checkLogin && checkpassword && checkEmail){
    //     checkAllData = true;
    // }
    // else{
    //     checkAllData = false;
    // }
    checkLogin && checkpassword && checkEmail ? checkAllData = true : checkAllData = false;

}
// BUTTON ADD USER
function addUsers(): void {
    if (checkAllData) {
        let user: User = new User(userLogin.value, userPassword.value, userEmail.value);
        userArr.push(user);
        checkAllData = false;
        render();
    }
    else {
        alert('Неправильно введені дані')
    }
}

// Function RENDER: ADD USER TO THE TABLE
function render() {
    form.reset();
    document.getElementById('tbody').innerHTML = '';
    for (let i: number = 0; i < userArr.length; i++) {
        let row = tbody.insertRow(i);
        let cell1: any = row.insertCell(0);
        let cell2: any = row.insertCell(1);
        let cell3: any = row.insertCell(2);
        let cell4: any = row.insertCell(3);
        let cell5: any = row.insertCell(4);
        let cell6: any = row.insertCell(5);

        cell1.innerHTML = i + 1;
        cell2.innerHTML = userArr[i].login;
        cell3.innerHTML = userArr[i].password;
        cell4.innerHTML = userArr[i].email;
        cell5.innerHTML = 'Edit';
        cell6.innerHTML = 'Delete';
        cell5.classList.add('edit');
        cell6.classList.add('delete');
        cell5.id = i;
        cell6.id = i;
    }
}

tbody.addEventListener('click', function():void{
    userIndex = event.target.id;
    console.log(userIndex);
    if((event.target as HTMLButtonElement).classList.contains('edit')){
        editUser();
    }
    else if((event.target as HTMLButtonElement).classList.contains('delete')){
        deleteUser();
    }
})
// FUNCTION DELETE USER
function deleteUser(){
    userArr.splice(userIndex, 1)
    render();
}
// FUNCTION EDIT USER
function editUser(){
    userLogin.value = userArr[userIndex].login;
    userPassword.value = userArr[userIndex].password;
    userEmail.value = userArr[userIndex].email;
    document.getElementById('addUser').classList.add('hide');
    document.getElementById('editUser').classList.remove('hide');
}

// BUTTON EDIT USER
function saveEditUser(){
    if (checkAllData) {
        let user: User = new User(userLogin.value, userPassword.value, userEmail.value);
        userArr[userIndex] = user;
        render();
        checkAllData = false;
        document.getElementById('editUser').classList.add('hide');
        document.getElementById('addUser').classList.remove('hide');
    }
    else {
        alert('Неправильно введені дані')
    }
}