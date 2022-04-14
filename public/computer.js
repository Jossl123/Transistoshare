var links = []

function execute(id) {
    var l = []
    var action = document.getElementById(id).getAttribute("action")
    var minInput = links.length
    for (var char of action.replace(/\D+/g, "")) {
        if (parseInt(char) < minInput) minInput = parseInt(char)
    }
    var inp = minInput
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
                inp = parseInt(action[i]) - minInput
                l.push(parseInt(document.getElementById(`${document.getElementById(id).parentNode.id}_i_${inp}`).getAttribute("value")))
                break;
        }
    }
    var finalValue = l.pop()
    switch (finalValue) {
        case true:
            return "1"
        case false:
            return "0"
        default:
            return finalValue
    }
}
String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    // le probleme est que il retourne les premiers 1 et 0 comme si c'etait des inputs, il oublie de les parcourir
function trace_path(input, n) {
    var linked_elem = ""
    for (let i = 0; i < links.length; i++) {
        if (links[i][1] == input) {
            linked_elem = links[i][0]
            i = links.length
        }
    }
    console.log(linked_elem)
    var path = document.getElementById(linked_elem).getAttribute("action")
    if (linked_elem[0] != "I") {
        var k = document.querySelectorAll(`[id^="${linked_elem[0]}_i"]`)
        var outputs = []
        for (let i = 0; i < k.length; i++) {
            outputs.push(k[i].id)
        }
        for (let i = 0; i < outputs.length; i++) {
            var t = trace_path(outputs[i], n + 1)
            t = convert(t, "0123456789", "abcdefghij")
            path = path.replaceAll(`${i}`, t)
        }
        path = convert(path, "abcdefghij", "0123456789")
    }
    return path
}

function convert(str, i, o) {
    var fstr = str
    for (let e = 0; e < fstr.length; e++) {
        if (i.includes(fstr[e])) {
            fstr = fstr.replaceAt(e, o[i.indexOf(fstr[e])])
        }
    }
    return fstr
}

function update() {
    for (let i = 0; i < links.length; i++) {
        var v = execute(document.getElementById(links[i][0]).getAttribute("id"))
        document.getElementById(links[i][0]).setAttribute("value", v)
        document.getElementById(links[i][1]).setAttribute("value", v)
        if (v == 1) {
            document.getElementById(`line-${links[i][0]}-${links[i][1]}`).style.stroke = "rgb(200, 0, 0)"
        } else { //remplacer class par les styles cest pour ca
            document.getElementById(`line-${links[i][0]}-${links[i][1]}`).style.stroke = "rgb(255, 255, 255)"
        }
    }
}
var linking = false
var link_nb = 0

function create_link(e) {
    if (linking) { //si on a deja selectionné un point
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
        }
    } else {
        point_to_link = e.path[0].getAttribute("id")
        linking = true
    }
    update()
}

function create_block() {
    var outputsActions = []
    for (let i = 0; i < output_nb; i++) {
        outputsActions.push(trace_path(`O_${i}`))
    }
    add_block(outputsActions, prompt("Name of the bloc : "))
    document.getElementById("button_block").innerHTML += `<button onclick='add_block(${JSON.stringify(outputsActions)}, "${prompt("Name of the bloc : ")}")' class="m-2 text-white">${prompt("Name of the bloc : ")}</button>`
}

function execute_path(id) {
    update()
}
setInterval(function() {
    update()
}, 100);