var current_road = ""; //chaque charactere aura deux valeurs : son index dans la chaine et le nb de lettre qui sont accrochés derriere lui
var inputs_nb = 0;
var linking = false;
var links = []
var point_to_link;
class Block {
    constructor(inputs, outputs, action) {
        this.inputs = inputs
        this.outputs = outputs
        this.action = action
    }
}

function execute() {
    var l = []
    for (let i = 0; i < this.action.length; i++) {
        switch (this.action[i]) {
            case "&":
                l.push(l.pop() && l.pop())
                break;
            case "|":
                l.push(l.pop() || l.pop())
                break;
            case "!":
                l.push(!l.pop())
                break;
            default:
                l.push(this.inputs[parseInt(this.action[i])])
                break;
        }
    }
    return l.pop()
}
TEST = new Block([0, 0, 0], [0], "01&2|!")
AND = new Block([0, 0], [0], "01&")
OR = new Block([0, 0], [0], "01|")
NOT = new Block([0], [0], "0!")

function cutStr(str, debut, fin) { return str.substr(0, debut) + str.substr(fin) } //remove a part of a string

function link(i1, n1, i2, iN) { //i1 : index block cliqué; n1 : longueur block cliqué; i2 : index block destination; iN : index de l'input du block
    var index_debut_block = i1 - (n1 - 1) // index debut du block cliqué
    var block = current_road.substr(i1 - n1 + 1, n1) // string contenant le block a relier
    document.getElementById(`${i1}`).setAttribute("id", "waiting")
    document.getElementById(`${i2}`).setAttribute("l", parseInt(document.getElementById(`${i2}`).getAttribute("l")) + n1 - 1)
    current_road = cutStr(current_road, index_debut_block, index_debut_block + n1) // on retire le block cliqué du chemin
    for (let i = i1; i < current_road.length + block.length; i++) { //on actualise l'id de tous les blocks après celui qui vient d'être retiré du chemin
        if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i - n1) }
    }
    if (i1 < i2) { i2 -= n1 }
    var iPlaceBlock = i2 - 1
    if (current_road[iPlaceBlock] != "K" || iN != 1) { //calculer l'index a laquelle mettre le block
        for (let i = 0; i < iN; i++) {
            if (document.getElementById(`${iPlaceBlock}`)) {
                iPlaceBlock -= document.getElementById(`${iPlaceBlock}`).getAttribute("l");
            } else if (current_road[iPlaceBlock] == "K") {
                if (i == iN - 1) {
                    i++
                } else { iPlaceBlock-- }
            } else {
                i--;
                iPlaceBlock--;
            }
            if (iPlaceBlock < 0) { return alert("error infinite loop") }
        }
    }
    current_road = current_road.slice(0, iPlaceBlock) + block + current_road.slice(iPlaceBlock + 1);
    for (let i = current_road.length + block.length - 1; i >= iPlaceBlock + 1; i--) {
        if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i + block.length - 1) }
    }
    for (let i = i1; i < i1 + block.length - 1; i++) {
        if (document.getElementById(`${i}`)) document.getElementById(`${i}`).setAttribute("id", iPlaceBlock + i - i1)
    }
    document.getElementById("waiting").setAttribute("id", iPlaceBlock + parseInt(document.getElementById("waiting").getAttribute("l")) - 1)
    console.log(current_road)
}

function create_link(e) {
    if (linking) { //si on a deja selectionné un point
        if (e.path[0].getAttribute("type") != point_to_link[0]) { //si le point cliqué n'est pas du même type que le premier point cliqué (intput / output)
            if (point_to_link[0] == "o") { //si le premier point était un output
                link(parseInt(point_to_link[1]), parseInt(point_to_link[2]), parseInt(e.path[1].id), parseInt(e.path[0].getAttribute("iN")))
            } else { //si le premier point était un input
                link(parseInt(e.path[1].id), parseInt(e.path[1].getAttribute("l")), parseInt(point_to_link[1]), parseInt(point_to_link[2]))
            }
        }
        var pos1 = point_to_link[3].getBoundingClientRect()
        var pos2 = e.path[0].getBoundingClientRect()
        links.push([point_to_link[3], e.path[0]])
        document.getElementById("svg_joint").innerHTML += `<line onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
        linking = false
        point_to_link = 0
    } else {
        if (e.path[0].getAttribute('type') == "i") {
            point_to_link = [e.path[0].getAttribute("type"), e.path[1].id, e.path[0].getAttribute("iN")]
        } else {
            point_to_link = [e.path[0].getAttribute("type"), e.path[1].id, e.path[1].getAttribute("l")]
        }
        point_to_link.push(e.path[0])
        linking = true
    }
}

function link_output(e) {
    e.path[1].setAttribute("action", current_road)
}