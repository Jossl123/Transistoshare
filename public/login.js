function login() {
    var formdata = new FormData(document.getElementById("form"))
    var formContent = {}
    formdata.forEach((value, key) => {
        formContent[key] = value
    })
    fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formContent)
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            if (!data.success) return alert(data.error)
            setCookie("token", data.data.token, 7)
            setCookie("userData", JSON.stringify(data.data.userData), 7)
            window.location.href = '/'
        })
        .catch(e => { //request error
            console.error(e)
        })
    return false
}