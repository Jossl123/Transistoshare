function verifyForm() {
    var formdata = new FormData(document.getElementById("form"))
    var formContent = {}
    formdata.forEach((value, key) => {
        formContent[key] = value
    })
    if (!formContent['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return alert('please enter valid email')
    else {
        fetch('/api/register', {
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
                console.log(data)
            })
            .catch(e => { //request error
                console.error(e)
            })
    }
    return false
}