function verifyForm() {
    var x;
    x = document.getElementById("username").value;
    if (x == "") {
        alert("Enter a valid username");
        return false;
    };
    return true
}