window.onload = function() {
    var token = getCookie("token")
    if (!token) return
    fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(token)
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            console.log(data)
        })
        .catch(e => { //request error
            console.error(e)
        })
    return false
};