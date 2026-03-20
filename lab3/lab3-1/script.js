function validateForm() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    document.getElementById("userError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("passError").innerHTML = "";
    document.getElementById("confirmError").innerHTML = "";

    let isValid = true;

    if (username.length < 5) {
        document.getElementById("userError").innerHTML =
            "Username must be at least 5 characters";
        isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML =
            "Invalid email format";
        isValid = false;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must be 10 digits";
        isValid = false;
    }

    let passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("passError").innerHTML =
            "Password must contain uppercase, lowercase, number and special character";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmError").innerHTML =
            "Passwords do not match";
        isValid = false;
    }

    return isValid;
}
