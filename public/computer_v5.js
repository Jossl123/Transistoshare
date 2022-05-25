var links = []
var linking = false
var link_nb = 0
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

//--------------------------------------------------------------------
// fonctions pour gérer la notation polonaise et tout ce qui rapporte
//--------------------------------------------------------------------

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
     retourne le circuit actuel, se terminant par output, en chaine de caractere sous la notation polonaise inversée
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


setInterval(function() { //horloge qui actualise toutes les 0.1 secondes
    update()
}, 100);