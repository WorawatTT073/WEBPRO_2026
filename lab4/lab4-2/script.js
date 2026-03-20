let isThai = true;

function changeLang() {
    if (isThai) {
        document.getElementById("fnameLabel").textContent = "First Name:";
        document.getElementById("lnameLabel").textContent = "Last Name:";
        document.getElementById("countryLabel").textContent = "Country:";
        document.getElementById("langBtn").textContent = "Change to Thai";
    } else {
        document.getElementById("fnameLabel").textContent = "ชื่อ:";
        document.getElementById("lnameLabel").textContent = "นามสกุล:";
        document.getElementById("countryLabel").textContent = "ประเทศ:";
        document.getElementById("langBtn").textContent = "Change to English";
    }
    isThai = !isThai;
}