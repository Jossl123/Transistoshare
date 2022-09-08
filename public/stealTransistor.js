async function stealTransistor(creator, name = "DEFAULT", path = [], description = "") {
    var res = false
    fetch('/api/stealTransistor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                creator: creator,
                name: name,
                path: path,
                public: 0,
                description: description
            })
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            if (data.success) {
                alert('saved')
            } else {
                alert('already yours')
            }
            res = data
        })
        .catch(e => { //request error
            res = e
        })
    return res
}