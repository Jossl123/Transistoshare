var userData
if (typeof getCookie === "function") {
    userData = getCookie("userData")
}
if (!userData) {
    user_transistors = [{
            path: ['0.1.&'],
            name: 'AND'
        },
        {
            path: ['0.1.|'],
            name: 'OR'
        },
        {
            path: ['0.!'],
            name: 'NOT'
        },
        {
            path: ['0.1.&.!'],
            name: 'NAND'
        },
        {
            path: ['0.1.|.!'],
            name: 'NOR'
        },
        {
            path: ['0.1.|.1.0.&.!.&'],
            name: 'XOR'
        },
        {
            path: ['0.1.|.1.0.&.!.&.2.|.2.0.1.|.1.0.&.!.&.&.!.&', '0.1.|.1.0.&.!.&.2.&.1.0.&.|'],
            name: 'ADDER'
        },
        {
            path: ['0.4.|.4.0.&.!.&.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.|.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.0.4.|.4.0.&.!.&.&.!.&', '1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.|.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.1.5.|.5.1.&.!.&.&.!.&', '2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.|.3.7.|.7.3.&.!.&.8.&.7.3.&.|.2.6.|.6.2.&.!.&.&.!.&', '3.7.|.7.3.&.!.&.8.|.8.3.7.|.7.3.&.!.&.&.!.&', '0.4.|.4.0.&.!.&.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.&.4.0.&.|'],
            name: '4bitAdder'
        },
        {
            path: ['0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&', '1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.&.!.&', '2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.|.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.&.!.&', '3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.|.8.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.&.!.&', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.&.4.8.|.8.4.&.!.&.0.&.|', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&.!.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.&.!.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.|.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.&.!.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.|.8.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.&.!.&.!.&'],
            name: 'ALU'
        },
        {
            path: ["R0.0.|.!.1.|.!"],
            name: 'TLASH'
        }
    ]
} else {
    userData = JSON.parse(userData)
    user_transistors = userData.transistors
    for (let i = 0; i < user_transistors.length; i++) {
        user_transistors[i].path = user_transistors[i].path.split("/")
    }
}
var transistors_nb = 0
var input_nb = 0
var output_nb = 0
var element_dragged

function init_userTransistors() {
    // permet d'écrire les transistors de l'utilisateur dynamiquement
    document.getElementById("transistors_block").innerHTML = ""
    for (let i = 0; i < user_transistors.length; i++) {
        var rec = getRecNb(user_transistors[i].path)
        document.getElementById("transistors_block").innerHTML += `<button class="px-2 py-1 rounded transition hover:bg-white/25 text-white" onclick='add_transistor(${JSON.stringify(user_transistors[i].path)}, "${user_transistors[i].name}", "${rec}")'>${user_transistors[i].name}</button>`
    }
}
init_userTransistors()

function getRecNb(outputs) {
    var rec = []
    var i = 0
    outputs.forEach(path => {
        rec.push(0)
        path = path.split(".")
        for (let o = 0; o < path.length; o++) {
            if (path[o].includes("R")) {
                var recNb = parseInt(path[o].substring(1)) + 1
                rec[i] = Math.max(rec[i], recNb)
            }
        }
        i++
    })
    return rec
}

function add_transistor(outputsActions, name, rec = []) {
    /**
     ajoute un transistor (lorsqu'on clique en bas)
     */
    var inputNb = 0
    for (let i = 0; i < outputsActions.length; i++) {

        var no = outputsActions[i].replaceAll("&", "").replaceAll("!", "").replaceAll("|", "").split('.');
        for (let o = 0; o < no.length; o++) {
            if (no[o].includes('R') || no[o].includes('r')) {
                no.splice(o, 1)
                o--
            }
        }
        var n = Math.max.apply(null, no)
        inputNb = Math.max(n, inputNb)
    }
    inputNb++
    var h = Math.max(inputNb, outputsActions.length)

    var newElem = document.createElement('button')
    const elemAttrs = {
        id: transistors_nb,
        onMouseOut: "this.style.boxShadow='0 0 0 5px rgba(200, 200, 200, 0)'",
        onMouseOver: "this.style.boxShadow='0 0 0 5px rgba(200, 200, 200, .25)'",
        ondrag: "element_drag(event)",
        ondragstart: "element_drag_ghost(event)",
        ondblclick: "delete_transistor(this)",
        draggable: true,
        class: "rounded z-30 absolute top-1/2 left-1/2 inline px-4 transition duration-200 scale-90 opacity-0",
        style: `background-color:${stringToColor(name)};height: ${h*2}rem`
    }

    for (const [attr, attrValue] of Object.entries(elemAttrs)) {
        newElem.setAttribute(attr, attrValue)
    }

    for (let i = 0; i < inputNb; i++) newElem.innerHTML += `<div id="${transistors_nb}_i_${i}" type="i" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -left-3" style="top: ${i*2+0.25}rem"></div>`
    for (let i = 0; i < outputsActions.length; i++) newElem.innerHTML += `<div id="${transistors_nb}_o_${i}" action="${outputsActions[i]}" type="o" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -right-3" style="top: ${i*2+0.25}rem" rem="${JSON.stringify(new Array(rec[i]).fill(0))}"></div>`
    newElem.innerHTML += `<p class="text-white mix-blend-luminosity">${name}</p>`

    document.getElementById("content").appendChild(newElem)
    transistors_nb++
    update_joint()

    // Transition
    requestAnimationFrame(() =>
        setTimeout(() => {
            document.getElementById(elemAttrs.id).classList.remove('scale-90', 'opacity-0')
        })
    )
}

function delete_transistor(el) {
    /**
     efface un transistor
     */

    el.classList.add('scale-90', 'opacity-0')

    requestAnimationFrame(() =>
        setTimeout(() => {
            var id = el.id
            for (let i = 0; i < links.length; i++) {
                if (links[i][0].split('_')[0] == id || links[i][1].split('_')[0] == id) {
                    links.splice(i, 1)
                    i--
                }
            }
            el.remove();
            update_joint()
        }, 75)
    )
}

function add_input_point() {
    /**
     ajoute un input sur la bare grise a gauche
     */
    document.getElementById("inputs_points").innerHTML += `
    <div id="I_${input_nb}" l="1" name="" action="${input_nb}" class="z-20 flex inline-flex items-center">
        <button id="I_${input_nb}_i" value="0" onclick="change_input_value('I_${input_nb}_i')" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="I_${input_nb}_o" type="o" action="${input_nb}" onclick="create_link(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full" style="background-color:rgb(255, 255, 255)"></button>
    </div>`
    input_nb++
    update_joint()
}

function change_input_value(id) {
    /**
    change la valeur des inputs sur la barre de gauche 
     */
    v = document.getElementById(id).getAttribute("value")
    document.getElementById(id).setAttribute("value", Number(!parseInt(v)))
    if (v == 0) document.getElementById(id).style.backgroundColor = "rgb(240, 60, 60)"
    else document.getElementById(id).style.backgroundColor = "rgb(255, 255, 255)"

}

function add_output_point() {
    /**
     ajoute un output sur la bare grise a droite
     */
    document.getElementById("outputs_points").innerHTML += `
    <div action="${output_nb}" class="z-20 flex inline-flex items-center">
        <button id="O_${output_nb}" type="i" action="${output_nb}" onclick="create_link(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="O_${output_nb}_o" value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full" style="background-color:rgb(255, 255, 255)"></button>
    </div>`
    output_nb++
    update_joint()
}

function stringToColor(stringInput) {
    /**
     retourne une couleur en fonction d'une chaine de caractères
     */
    let stringUniqueHash = [...stringInput].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
}

function update() {
    /**
     permet d'actualiser la couleur de des fils et des inputs / outputs
     */
    for (let i = 0; i < links.length; i++) {
        var v = executeById(document.getElementById(links[i][0]).id)
        document.getElementById(links[i][0]).setAttribute("value", v)
        document.getElementById(links[i][1]).setAttribute("value", v)
        if (v == 1) {
            document.getElementById(`line-${links[i][0]}-${links[i][1]}`).style.stroke = "rgb(240, 60, 60)"
            document.getElementById(links[i][0]).style.backgroundColor = "rgb(240, 60, 60)"
            document.getElementById(links[i][1]).style.backgroundColor = "rgb(240, 60, 60)"
            if (links[i][1][0] == "O") document.getElementById(links[i][1] + "_o").style.backgroundColor = "rgb(240, 60, 60)"
        } else {
            document.getElementById(`line-${links[i][0]}-${links[i][1]}`).style.stroke = "rgb(255, 255, 255)"
            document.getElementById(links[i][0]).style.backgroundColor = "rgb(255, 255, 255)"
            document.getElementById(links[i][1]).style.backgroundColor = "rgb(255, 255, 255)"
            if (links[i][1][0] == "O") document.getElementById(links[i][1] + "_o").style.backgroundColor = "rgb(255, 255, 255)"
        }
    }
}

function create_block() {
    /**
     permet de construire un nouveau transistor a partir du circuit actuel de l'utilisateur
     */
    var block_name = document.getElementById("transistor_name").value
    if (block_name.trim() == "" || block_name == "Transistor name") {
        document.getElementById("transistor_name").classList.add("border-red-500")
        return
    }
    var outputsActions = []
    var outputsConnectedId = []
    for (let i = 0; i < links.length; i++) {
        if (links[i][1].includes("O_")) {
            outputsConnectedId.push(links[i][1].split("_")[1])
        }
    }
    outputsConnectedId.sort((a, b) => a - b);
    for (let i = 0; i < outputsConnectedId.length; i++) {
        outputsActions.push(trace_path(`O_${outputsConnectedId[i]}`))
    }
    if (outputsActions.length == 0) {
        document.getElementById("create_popup").classList.add("hidden")
        return alert("no path")
    }
    if (getCookie("token")) {
        if (document.getElementById("save").value == 'on') {
            saveTransistor(block_name, outputsActions, document.getElementById('transistor_description').value)
        }
        userData = getUser()
        user_transistors = userData.transistors
    } else {
        user_transistors.push({ "path": outputsActions, "name": block_name })
    }
    init_userTransistors()
    add_transistor(outputsActions, block_name, getRecNb(outputsActions))
    document.getElementById("create_popup").classList.add("hidden")
}

function show_create() {
    document.getElementById("create_popup").classList.remove("hidden")
}

function close_create() {
    document.getElementById("create_popup").classList.add("hidden")
}

//-------------------------------------------------------------------------------------
// fonctions qui gèrent les fils
//-------------------------------------------------------------------------------------

function create_link(e) {
    /**
     permet de construire un fil entre deux points
     */
    if (linking) { //si on a deja selectionné un point
        try {
            for (let i = 0; i < links.length; i++) {
                if (links[i][1] == point_to_link || links[i][1] == e.target.id) {
                    throw "Already connected"
                }
            }
            if (e.target.getAttribute("type") != document.getElementById(point_to_link).getAttribute("type")) { //si le point cliqué n'est pas du même type que le premier point cliqué (intput / output)
                var pos1 = document.getElementById(point_to_link).getBoundingClientRect()
                var pos2 = e.target.getBoundingClientRect()
                if (document.getElementById(point_to_link).getAttribute("type") == "o") { //si le premier point était un output
                    links.push([point_to_link, e.target.id])
                    document.getElementById("svg_joint").innerHTML += `<line id="line-${point_to_link}-${e.target.id}" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                } else { //si le premier point était un input
                    links.push([e.target.id, point_to_link])
                    document.getElementById("svg_joint").innerHTML += `<line id="line-${e.target.id}-${point_to_link}" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                }
                linking = false
                link_nb++
                point_to_link = 0
                document.body.style.cursor = "pointer"
            }
        } catch (error) {
            console.log(error)
            linking = false
            point_to_link = 0
            document.body.style.cursor = "pointer"
        }
    } else {
        document.body.style.cursor = "crosshair"
        point_to_link = e.target.getAttribute("id")
        linking = true
    }
    update()
}

function update_joint() {
    /**
     actualise la position des fils 
     */
    document.getElementById("svg_joint").innerHTML = ""
    links.forEach(link => {
        var pos1 = document.getElementById(link[0]).getBoundingClientRect()
        var pos2 = document.getElementById(link[1]).getBoundingClientRect()
        document.getElementById("svg_joint").innerHTML += `<line id="line-${link[0]}-${link[1]}"" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
    });
    update()
}

function delete_joint(e) {
    /**
     supprime un fil
     */
    var idsep = e.target.id.split('-')
    for (let i = 0; i < links.length; i++) {
        if (JSON.stringify(links[i]) == JSON.stringify([idsep[1], idsep[2]])) {
            links.splice(i, 1)
            break;
        }
    }
    update_joint()
    update()
}

window.addEventListener("resize", update_joint) // actualise les fils quand la fenetre est recadrée

//-------------------------------------------------------------------------------------
// fonctions qui permettent de pouvoir deplacer les transistors
//-------------------------------------------------------------------------------------

function element_drag(event) {
    element_dragged = event.target.id

    drop(event)
}

function element_drag_ghost(event) {
    event.dataTransfer.setDragImage(document.createElement('img'), 0, 0)
}

function drop(event) {
    var dm = document.getElementById(element_dragged)

    if (event.clientX != 0 || event.clientY != 0) {
        dm.style.left = event.clientX - 60 + 'px'
        dm.style.top = event.clientY - 30 + 'px'
    }

    update_joint()
    event.preventDefault()
    return false
}

function drag_over(event) {
    event.preventDefault()
    return false
}
