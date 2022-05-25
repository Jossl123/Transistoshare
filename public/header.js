var userData = JSON.parse(getCookie("userData"))

window.onload = function() {
    if (!userData) return
    document.getElementById("header-right").innerHTML = `
    <li class="mr-3">
        <a class="inline-block text-gray-800 no-underline py-2 px-4 bg-white rounded transition transform hover:scale-105" href="/account">${userData.username}</a>
    </li>
    <li class="mr-3">
        <button class="inline-block text-gray-800 no-underline py-2 px-4 bg-white rounded transition transform hover:scale-105" onclick="logout()">Log out</button>
    </li>
    `
}

function logout() {
    var token = getCookie("token")
    if (!token || token == "") return
    fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ "token": token })
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            removeCookie("token")
            removeCookie("userData")
            window.location.href = "./";
        })
        .catch(e => { //request error
            console.error(e)
        })
}