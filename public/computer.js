links = [['I_0', '2_i_0']
, ['I_1', '2_i_1']
, ['I_2', '0_i_1']
, ['2_o_0', '0_i_0']
, ['0_o_0', '1_i_0']
, ['1_o_0', 'O_0']]

class Block {
    constructor(inputs, outputs, action) {
        this.inputs = inputs
        this.outputs = outputs
        this.action = action
    }
}

function execute(action) {
    var l = []
    for (let i = 0; i < action.length; i++) {
        switch (action[i]) {
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
                l.push(document.getElementById(action[i]).getAttribute("value"))
                break;
        }
    }
    return l.pop()
}
TEST = new Block([0, 0, 0], [0], "01&2|!")
AND = new Block([0, 0], [0], "01&")
OR = new Block([0, 0], [0], "01|")
NOT = new Block([0], [0], "0!")
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function trace_path(input, km) {
    var linked_elem = ""
    for (let i = 0; i < links.length; i++) {
        if (links[i][1] == input){
            linked_elem = links[i][0]
            i = links.length
        }
    }
    var path = document.getElementById(linked_elem).parentNode.getAttribute("action")
    if (linked_elem[0] != "I"){
        var k=document.querySelectorAll(`[id^="${linked_elem[0]}_i"]`)
        var outputs = []
        for (let i = 0; i < k.length; i++) {
            outputs.push(k[i].id)
        }
        for (let i = 0; i < outputs.length; i++) {
            var t=trace_path(outputs[i], km+1)
            for (let e = 0; e < t.length; e++) {
                if ("0123456789".includes(t[e])){
                    t = t.replaceAt(e, "abcdefghij"["0123456789".indexOf(t[e])])
                }
            }
            path = path.replace(`${i}`,t)
        }
        for (let e = 0; e < path.length; e++) {
            if ("abcdefghij".includes(path[e])){
                path = path.replaceAt(e, "0123456789"["abcdefghij".indexOf(path[e])])
            }
        }
    }
    console.log(path)
    return path
}

function update() {
    for (let i = 0; i < links.length; i++) {
        document.getElementById(links[i][0]).getAttribute("value") = execute(document.getElementById(links[i][0]).getAttribute("action"))
        document.getElementById(links[i][1]).getAttribute("value") = document.getElementById(links[i][0]).getAttribute("value")
    }
}
var linking = false

function create_link(e) {
    if (linking) { //si on a deja selectionné un point
        if (e.path[0].getAttribute("type") != document.getElementById(point_to_link).getAttribute("type")) { //si le point cliqué n'est pas du même type que le premier point cliqué (intput / output)
            if (document.getElementById(point_to_link).getAttribute("type") == "o") { //si le premier point était un output
                links.push([point_to_link, e.path[0].id])
            } else { //si le premier point était un input
                links.push([e.path[0].id, point_to_link])
            }
            var pos1 = document.getElementById(point_to_link).getBoundingClientRect()
            var pos2 = e.path[0].getBoundingClientRect()
            document.getElementById("svg_joint").innerHTML += `<line onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
            linking = false
            point_to_link = 0
        }
    } else {
        point_to_link = e.path[0].getAttribute("id")
        linking = true
    }
}