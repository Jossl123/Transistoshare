var feed
async function getFeed(name = "DEFAULT", path = [], description = "") {
    fetch('/api/getFeed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            if (response.ok) return response.json()
            else throw JSON.stringify(response)
        }).then(data => { //request work
            if (!data.success) return false
            feed = data.data
            showFeed(data.data)
        })
        .catch(e => { //request error
            console.error(e)
        })
    return false
}
getFeed()

function showFeed(feed) {
    if (!feed) return
    for (let i = 0; i < feed.length; i++) {
        disabled = ""
            // var d = document.createElement("div")
            // var a = document.createElement("a").setAttribute("href", "#")
            // a.appendChild(`
            // <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${feed[i].name}</h5>
            // <h2 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">by ${feed[i].property}</h2>000`)
            // var p = document.createElement("p").setAttribute("class", 'mb-3 font-normal text-gray-700 dark:text-gray-400')
            // d.appendChild(a)
            // document.getElementById("content").appendChild(d)
        document.getElementById("content").innerHTML += `
        <div class="p-6 m-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${feed[i].name}</h5>
                <h2 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">by ${feed[i].property}</h2>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${feed[i].description}</p>
            <div class="flex gap-1">
                <button onclick="like(${i})"><span id="like_${i}" class="material-symbols-outlined">
                favorite
                </span></button>
                <button onclick="addToYours(${i})" ${disabled} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to yours
                    <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>`
    }
}

async function like(i) {
    if (!userData) return alert("pas connecté")
    var t = feed[i]
    await likeTransistor(t.name, t.path.split("/"), t.description).then(e => {
        if (!e.success) {
            console.log(e)
            alert('already yours')
        } else {
            alert('saved')
        }
    })
    var heart = document.getElementById("like_" + i)
    if (!heart.classList.contains("fill")) {
        heart.classList.add("fill")
    } else {
        heart.classList.remove("fill")
    }
}

async function addToYours(i) {
    if (!userData) return alert("pas connecté")
    var t = feed[i]
    await stealTransistor(t.property, t.name, t.path.split("/"), t.description).then(e => {
        getUser()
    })
}
showFeed()