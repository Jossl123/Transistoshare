var user_transistors = [
    [
        ['0.1.&'], 'AND'
    ],
    [
        ['0.1.|'], 'OR'
    ],
    [
        ['0.!'], 'NOT'
    ],
    [
        ['0.1.&.!'], 'NAND'
    ],
    [
        ['0.1.|.1.0.&.!.&'], 'XOR'
    ],
    [
        ['0.1.|.1.0.&.!.&.2.|.2.0.1.|.1.0.&.!.&.&.!.&', '0.1.|.1.0.&.!.&.2.&.1.0.&.|'], 'ADDER'
    ],
    [
        ['0.4.|.4.0.&.!.&.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.|.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.0.4.|.4.0.&.!.&.&.!.&', '1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.|.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.1.5.|.5.1.&.!.&.&.!.&', '2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.|.3.7.|.7.3.&.!.&.8.&.7.3.&.|.2.6.|.6.2.&.!.&.&.!.&', '3.7.|.7.3.&.!.&.8.|.8.3.7.|.7.3.&.!.&.&.!.&', '0.4.|.4.0.&.!.&.1.5.|.5.1.&.!.&.2.6.|.6.2.&.!.&.3.7.|.7.3.&.!.&.8.&.7.3.&.|.&.6.2.&.|.&.5.1.&.|.&.4.0.&.|'], '4bitAdder'
    ],
    [
        ['0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&', '1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.&.!.&', '2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.|.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.&.!.&', '3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.|.8.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.&.!.&', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.&.4.8.|.8.4.&.!.&.0.&.|', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&', '0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.&.5.8.|.8.5.&.!.&.1.&.|.0.4.8.|.8.4.&.!.&.|.4.8.|.8.4.&.!.&.0.&.!.&.&.!.&.!.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.&.6.8.|.8.6.&.!.&.2.&.|.1.5.8.|.8.5.&.!.&.|.5.8.|.8.5.&.!.&.1.&.!.&.&.!.&.!.&.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.|.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.&.7.8.|.8.7.&.!.&.3.&.|.2.6.8.|.8.6.&.!.&.|.6.8.|.8.6.&.!.&.2.&.!.&.&.!.&.!.&.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.8.|.8.3.7.8.|.8.7.&.!.&.|.7.8.|.8.7.&.!.&.3.&.!.&.&.!.&.!.&'], 'ALU'
    ]
]
var transistors_nb = 0
var input_nb = 0
var output_nb = 0
var element_dragged

function init_userTransistor() {
    // permet d'écrire les transistors de l'utilisateur dynamiquement
    for (let i = 0; i < user_transistors.length; i++) {
        document.getElementById("button_block").innerHTML += `<button onclick='add_transistor(${JSON.stringify(user_transistors[i][0])}, "${user_transistors[i][1]}")' class="m-2 text-white">${user_transistors[i][1]}</button>`
    }
}
init_userTransistor()

function add_transistor(outputsActions, name) {
    /**
     ajoute un transistor (lorsqu'on clique en bas)
     */
    var inputNb = 0
    for (let i = 0; i < outputsActions.length; i++) {
        var n = Math.max.apply(null, outputsActions[i].replaceAll("&", "").replaceAll("!", "").replaceAll("|", "").split('.'));
        if (n > inputNb) inputNb = n
    }
    inputNb++
    var h = Math.max(inputNb, outputsActions.length)
    var r = `<div id="${transistors_nb}"onMouseOut="this.style.boxShadow='0 0 0 0 rgba(200, 200, 200, .7)'" onMouseOver="this.style.boxShadow='0 0 0 5px rgba(200, 200, 200, .7)'" ondrag="element_drag(event)" ondblclick="delete_transistor(this)" draggable="true" class="z-30 absolute top-1/2 left-1/2 inline px-4" style="background-color:${stringToColor(name)};height: ${h*2}rem">`
    for (let i = 0; i < inputNb; i++) r += `<div id="${transistors_nb}_i_${i}" type="i" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -left-3" style="top: ${i*2+0.25}rem"></div>`
    for (let i = 0; i < outputsActions.length; i++) r += `<div id="${transistors_nb}_o_${i}" action="${outputsActions[i]}" type="o" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -right-3" style="top: ${i*2+0.25}rem"></div>`
    r += `<p>${name}</p></div>`
    document.getElementById("content").innerHTML += r
    transistors_nb++
    update_joint()
}

function delete_transistor(el) {
    /**
     efface un transistor
     */
    var id = el.id
    for (let i = 0; i < links.length; i++) {
        if (links[i][0].split('_')[0] == id || links[i][1].split('_')[0] == id) {
            links.splice(i, 1)
            i--
        }
    }
    el.remove();
    update_joint()
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

function create_link(e) {
    /**
     permet de construire un fil entre deux points
     */
    if (linking) { //si on a deja selectionné un point
        try {
            if (e.path[0].getAttribute("type") != document.getElementById(point_to_link).getAttribute("type")) { //si le point cliqué n'est pas du même type que le premier point cliqué (intput / output)
                var pos1 = document.getElementById(point_to_link).getBoundingClientRect()
                var pos2 = e.path[0].getBoundingClientRect()
                if (document.getElementById(point_to_link).getAttribute("type") == "o") { //si le premier point était un output
                    links.push([point_to_link, e.path[0].id])
                    document.getElementById("svg_joint").innerHTML += `<line id="line-${point_to_link}-${e.path[0].id}" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                } else { //si le premier point était un input
                    links.push([e.path[0].id, point_to_link])
                    document.getElementById("svg_joint").innerHTML += `<line id="line-${e.path[0].id}-${point_to_link}" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
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
        point_to_link = e.path[0].getAttribute("id")
        linking = true
    }
    update()
}

function create_block() {
    /**
     permet de construire un nouveau transistor a partir du circuit actuel de l'utilisateur
     */
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
    var block_name = prompt("Name of the bloc : ")
    add_transistor(outputsActions, block_name)
    document.getElementById("button_block").innerHTML += `<button onclick='add_transistor(${JSON.stringify(outputsActions)}, "${block_name}")' class="m-2 text-white">${block_name}</button>`
}
//-------------------------------------------------------------------------------------
// fonctions qui permettent de pouvoir deplacer les transistors
//-------------------------------------------------------------------------------------
function element_drag(event) {
    element_dragged = event.path[0].id
}

function drop(event) {
    var dm = document.getElementById(element_dragged);
    dm.style.left = event.clientX - 60 + 'px';
    dm.style.top = event.clientY - 30 + 'px';
    update_joint()
    event.preventDefault();
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
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
    var idsep = e.path[0].id.split('-')
    for (let i = 0; i < links.length; i++) {
        if (JSON.stringify(links[i]) == JSON.stringify([idsep[1], idsep[2]])) {
            links.splice(i, 1)
            break;
        }
    }
    update_joint()
    update()
}

window.addEventListener("resize", update_joint) //actualise les fils quand la fenetre est recadrer