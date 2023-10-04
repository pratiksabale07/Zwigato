
// Register
function register() {
    if (!localStorage.userList) {
        let obj = { name: [] }
        localStorage.setItem('userList', JSON.stringify(obj))
    }
    let firstName = document.getElementById('fname').value
    let lastName = document.getElementById('lname').value
    let age = document.getElementById('age').value
    let city = document.getElementById('city').value
    let userName = document.getElementById('username').value
    let password1 = document.getElementById('password1').value
    let details = { 'firstName': firstName, 'lastName': lastName, 'age': age, 'city': city, 'userName': userName.toLowerCase(), 'password1': password1 }
    var auth = /^(?=.*[-\#\$\.\%\&\@\!\+\=\\*])(?=.*[a-zA-Z])(?=.*\d).{8,12}$/;

    userName = userName.toLowerCase()

    let userList = JSON.parse(localStorage.userList)
    let length = userList.name.length
    var fondUserName = userList.name.find(elm => elm.userName === userName);
    // if any field is empty
    if (firstName == "" || lastName == "" || age == "" || city == "" || userName == "" || password1 == "") {
        document.getElementById('regAlert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please! </strong> Fill all the fields <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
    // if pass length is small
    else if (password1.match(auth) === null || password1.length <= 7) {
        document.getElementById('regAlert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Must contain atleast 1 number, 1 Special charater & password lenght should be more than 7 characters<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    // if username already exist
    else if (fondUserName) {
        document.getElementById('regAlert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Warning! </strong> Username already Exist <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`
    }
    else if (password1 != null && password1.match(auth) && password1.length > 7) {
        userList.name[length] = details
        sessionStorage.setItem('lastUser', userName)
        localStorage.setItem('userList', JSON.stringify(userList))
        location.href = 'login.html'
    }
}


function validate() {
    let flag = 0;
    let userName = document.getElementById('username').value
    let password1 = document.getElementById('password1').value
    if (userName == '' || password1 == '') {
        window.alert("Please fill all the details")
        flag = 1
    }
    if (flag == 0) {
        userName = userName.toLowerCase()
        let userList = JSON.parse(localStorage.userList)
        let userNameFound = userList.name.find(elm => elm.userName === userName)
        let passFound = userList.name.find(elm => elm.password1 === password1)
        if (!passFound || !userNameFound) {
            window.alert("Please Enter Valid Credentials")
        }
        if (userNameFound && passFound) {
            sessionStorage.setItem('lastUser', userName)
            localStorage.setItem('lastUser', userName)
            window.location.href = "submit.html"
        }
    }
}