var links = []
var linking = false
var link_nb = 0
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function executeById(id) {
    /**
     execute l'action du transistor a partir de son id
     */
    if (id[0] == "I") return document.getElementById(id.slice(0, -1) + "i").getAttribute("value") //retourne la valeur de l'input
    var parent = document.getElementById(id).parentNode.id
    var parentInputs = document.querySelectorAll(`[id^="${parent}_i"]`)
    var inputs = []
    for (let i = 0; i < parentInputs.length; i++) inputs.push(parentInputs[i].getAttribute("value"))
    var action = document.getElementById(id).getAttribute("action")
    return execute(inputs, action)
}

function execute(inputs, action) {
    /** 
        retourne le résultat de l'execution de l'action (1 ou 0)
        inputs : tableaux des valeurs des inputs
        action : chaine de caractère représentant le circuit
    */
    var l = []
    action = action.split(".")
    for (let i = 0; i < action.length; i++) {
        switch (action[i]) {
            case "&":
                var v1 = l.pop()
                var v2 = l.pop()
                l.push(v1 && v2)
                break;
            case "|":
                var v1 = l.pop()
                var v2 = l.pop()
                l.push(v1 || v2)
                break;
            case "!":
                var v1 = l.pop()
                l.push(!v1)
                break;
            default:
                l.push(parseInt(inputs[parseInt(action[i])]))
                break;
        }
    }
    return `${Number(l.pop())}`
}

function trace_path(output) {
    /**
     retourne le circuit actuel se terminant output en chaine de caractere sous la notation polonaise inversée
     output : id du transistor à parcourir
     */
    var linked_elem = "" // input auquel est relié l'output que l'on souhaite concaténiser
    for (let i = 0; i < links.length; i++) {
        if (links[i][1] == output) {
            linked_elem = links[i][0]
            i = links.length
        }
    }
    var path = document.getElementById(linked_elem).getAttribute("action").split('.') //notation du transistor de l'input
    if (linked_elem[0] != "I") { //si ça n'est pas un input
        var inputsOfElement = document.querySelectorAll(`[id^="${linked_elem.split('_')[0]}_i"]`)
        for (let i = 0; i < inputsOfElement.length; i++) {
            var new_path = convertToN(trace_path(inputsOfElement[i].id))
            for (let n = 0; n < path.length; n++) {
                if (path[n] == `${i}`) {
                    path.splice(n, 1, ...new_path)
                    n += new_path.length
                }
            }
        }
        path = unconvertToN(path)
    }
    return path.join(".")
}

function convertToN(str) {
    /**
     permet dans trace_path de différencier les inputs deja parcourus et ceux qui ne l'ont pas été
     str: string
     retourne un tableau des éléments de str avec tous les nombres de str en ce nombre avec un "N" devant 
     */
    var a = str.split('.')
    for (let i = 0; i < a.length; i++) {
        if (!isNaN(a[i])) { //si c'est un nombre
            a[i] = "N" + a[i]
        }
    }
    return a
}

function unconvertToN(a) {
    /**
     permet dans trace_path de différencier les inputs deja parcourus et ceux qui ne l'ont pas été
     a: tableau identique a celui en sorti de convertToN
     retourne un tableau des éléments de str avec tous les élements qui commencent par "N" qui l'ont vu disparaître
     */
    for (let i = 0; i < a.length; i++) {
        if (a[i][0] == "N") { //si c'est un nombre
            a[i] = a[i].slice(1)
        }
    }
    return a
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

setInterval(function() { //horloge qui actualise toutes les 0.1 secondes
    update()
}, 100);