function getUser() {
    fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                token: getCookie("token")
            })
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            if (data.success) {
                setCookie("token", data.data.token, 7)
                setCookie("userData", JSON.stringify(data.data.userData), 7)
            }
        })
        .catch(e => { //request error
            console.log(e)
        })
    return
}