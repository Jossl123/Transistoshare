function saveTransistor(name = "DEFAULT", path = [], description = "") {
    fetch('/api/saveTransistor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                name: name,
                path: path,
                public: 0,
                description: description
            })
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
}
console.log(userData, "test")