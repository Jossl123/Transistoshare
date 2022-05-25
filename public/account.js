var userData = JSON.parse(getCookie("userData"))

function update() {
    for (let i = 0; i < userData.transistors.length; i++) {
        var checked = ""
        if (userData.transistors[i].public) checked = "checked"
        document.getElementById("transistors").innerHTML +=
            `<div class="p-6 m-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${userData.transistors[i].name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${userData.transistors[i].description}</p>
            <div class="flex">
                <p>public</p>
                <div class="flex m-1 justify-center">
                    <div class="form-check form-switch">
                        <input onchange="publicity(${i})" type="checkbox" ${checked}></input>
                    </div>
                </div>
            </div>
        </div>`
    }
}
update()

function publicity(i) {
    if(!userData.transistors[i].public){
        if(confirm("Do you want to publish this transistor ?")){
            userData.transistors[i].public = 1
            modifyTransistor(userData.transistors[i])
            alert("Published")
        }
    }else{
        if(confirm("Do you want to unpublish this transistor ?")){
            userData.transistors[i].public = 0
            modifyTransistor(userData.transistors[i])
            alert("Unpublished")
        }
    }
}