var current_road = "" //chaque charactere aura deux valeurs : son index dans la chaine et le nb de lettre qui sont accrochés derriere lui
var inputs_nb = 0
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

function link(i1, n1, i2, iN) {
    console.log(i1, n1, i2, iN)
    var index_debut_block = i1 - (n1 - 1)
    var block = current_road.substr(i1 - n1 + 1, n1)
    current_road = cutStr(current_road, index_debut_block, index_debut_block + n1)
    if (i1 < i2) { i2 -= n1 }
    p = iN //faire boucle iN fois pour chaque getelementid() et ajouter les getattribute("l")
    if (current_road[i2 - p] == "K") { //verifie qu'il n'y a pas de case a compléter juste avant
        current_road = current_road.slice(0, i2 - p) + block + current_road.slice(i2 - p + 1);
        for (let i = i2 - p + 1; i < current_road.length + block.length; i++) {
            if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i - 1) }
        }
    } else {
        current_road = current_road.slice(0, i2) + block + current_road.slice(i2);
        for (let i = i2; i < current_road.length + block.length; i++) {
            if (document.getElementById(i)) { document.getElementById(i).setAttribute("id", i - 1) }
        }
    }
    console.log(current_road)
}
add_input_point()
add_input_point()
add_block(AND)
var linking = false
var point_to_link

function create_link(e) {
    if (linking) {
        if (e.path[0].getAttribute("type") != point_to_link[0]) {
            if (point_to_link[0] == "o") {
                console.log("o")
                link(parseInt(point_to_link[1]), parseInt(point_to_link[2]), parseInt(e.path[1].id), parseInt(e.path[0].getAttribute("iN")))
            } else {
                console.log("e", point_to_link)
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
        linking = true
    }
}