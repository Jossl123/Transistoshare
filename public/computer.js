var current_road = ""; //chaque charactere aura deux valeurs : son index dans la chaine et le nb de lettre qui sont accrochés derriere lui
var inputs_nb = 0;
var linking = false;
var point_to_link;
var gates = "&|!"
class Block {
    constructor(inputs, outputs, action) {
        this.inputs = inputs
        this.outputs = outputs
        this.action = action
    }
    execute() {
        var l = []
        for (let i = 0; i < this.action.length; i++) {
            if (this.action[i] == "&") {
                l.push(l.pop() && l.pop())
            } else if (this.action[i] == "|") {
                l.push(l.pop() || l.pop())
            } else if (this.action[i] == "!") {
                l.push(!l.pop())
            } else {
                l.push(this.inputs[parseInt(this.action[i])])
            }
        }
        return l.pop()
    }
}
TEST = new Block([0, 0, 0], [0], "01&2|!")
AND = new Block([0, 0], [0], "01&")
OR = new Block([0, 0], [0], "01|")
NOT = new Block([0], [0], "0!")

function cutStr(str, debut, fin) { return str.substr(0, debut) + str.substr(fin) }

function link(i1, n1, i2, iN) { //i1 : index block cliqué; n1 : longueur block cliqué; i2 : index block destination; iN : index de l'input du block
    console.log(n1, iN)
    var index_debut_block = i1 - (n1 - 1) // index debut du block cliqué
    var block = current_road.substr(i1 - n1 + 1, n1) // string contenant le block a relier
    console.log(i1)
    document.getElementById(`${i1}`).setAttribute("id", "waiting")
    console.log(document.getElementById("waiting"))
    document.getElementById(`${i2}`).setAttribute("l", parseInt(document.getElementById(`${i2}`).getAttribute("l"))+n1-1)
    current_road = cutStr(current_road, index_debut_block, index_debut_block + n1) // on retire le block cliqué du chemin
    for (let i = i1; i < current_road.length + block.length; i++) { //on actualise l'id de tous les blocks après celui qui vient d'être retiré du chemin
        if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i - n1) }
    }
    if (i1 < i2) { i2 -= n1 }
    var iPlaceBlock = i2-1
    if (current_road[iPlaceBlock]!="K" || iN!=1){    
        for (let i = 0; i < iN; i++) {
            console.log(iPlaceBlock)
            if(document.getElementById(`${iPlaceBlock}`)){iPlaceBlock-=document.getElementById(`${iPlaceBlock}`).getAttribute("l");
            console.log("d")}
            else if (current_road[iPlaceBlock]=="K") {
                console.log("K")
                if (i==iN-1) {
                    i++
                } else {
                    iPlaceBlock--
                }
            }else{i--; iPlaceBlock--;
                console.log("i")}
        }
    }
    //if (current_road[iPlaceBlock] == "K") { //verifie qu'il n'y a pas de case a compléter juste avant
    console.log(current_road, iPlaceBlock)
    current_road = current_road.slice(0, iPlaceBlock) + block + current_road.slice(iPlaceBlock + 1);
    for (let i = current_road.length + block.length -1; i >= iPlaceBlock+1; i--) {
        if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i + block.length - 1) }
    }
    console.log(iPlaceBlock)
    document.getElementById("waiting").setAttribute("id", iPlaceBlock+document.getElementById("waiting").getAttribute("l")-1)
    // } else {
    //     current_road = current_road.slice(0, i2) + block + current_road.slice(i2);
    //     for (let i = i2; i < current_road.length + block.length; i++) {
    //         if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i - 1) }
    //     }
    //     document.getElementById("waiting").setAttribute("id", i2)
    // }
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
        linking = false
        point_to_link = 0
    } else {
        if (e.path[0].getAttribute('type') == "i") {
            point_to_link = [e.path[0].getAttribute("type"), e.path[1].id, e.path[0].getAttribute("iN")]
        } else {
            point_to_link = [e.path[0].getAttribute("type"), e.path[1].id, e.path[1].getAttribute("l")]
        }
        point_to_link.push(e.path[0].getBoundingClientRect())
        linking = true
    }
}