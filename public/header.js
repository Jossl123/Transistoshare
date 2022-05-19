var userData

window.onload = function() {
    var token = getCookie("token")
    if (!token || token == "") return
    fetch('/api/getUser', {
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
            if (!data.success) return removeCookie("token")
            userData = data.data
            console.log(userData.transistors)
            for (let i = 0; i < userData.transistors.length; i++) {
                userData.transistors[i].path = userData.transistors[i].path.split("/")
            }
            console.log(userData.transistors)
            document.getElementById("header-right").innerHTML = `
            <li class="mr-3">
                <a class="inline-block text-gray-800 no-underline py-2 px-4 bg-white rounded transition transform hover:scale-105" href="/account">${userData.username}</a>
            </li>
            <li class="mr-3">
                <button class="inline-block text-gray-800 no-underline py-2 px-4 bg-white rounded transition transform hover:scale-105" onclick="logout()">Log out</button>
            </li>
            `
        })
        .catch(e => { //request error
            console.error(e)
        })
    return false
};

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
            window.location.href = "./";
        })
        .catch(e => { //request error
            console.error(e)
        })
}