var nb = 0
var input_nb = 0
var output_nb = 0

function add_input_point() {
    document.getElementById("inputs_points").innerHTML += `
    <div id="I_${input_nb}" l="1" name="" action="${input_nb}" class="z-20 flex inline-flex items-center">
        <button id="I_${input_nb}_i_0" value="0" onclick="change_input_value('I_${input_nb}_i_0')" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="I_${input_nb}_c" action="${input_nb}" onclick="create_link(event)" type="o" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    input_nb++
}

function add_output_point() {
    document.getElementById("outputs_points").innerHTML += `
    <div action="${output_nb}" class="z-20 flex inline-flex items-center">
        <button id="O_${output_nb}" action="${output_nb}" type="i" onclick="create_link(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    output_nb++
    //update_joint()
}

function add_block(block, outputsActions, name) {
    //block.action.replaceAll("&", "").replaceAll("!", "").replaceAll("|", "")
    var h = Math.max(block.inputs.length, outputsActions.length)
    var r = `<div id="${nb}" action="${block.action}" ondrag="element_drag(event)" draggable="true" class="z-30 absolute top-1/2 left-1/2 bg-blue-600 w-20" style="height: ${h*2}rem">`
    for (let i = 0; i < block.inputs.length; i++) r += `<div id="${nb}_i_${i}" type="i" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -left-3" style="top: ${i*2+0.25}rem"></div>`
    for (let i = 0; i < outputsActions.length; i++) r += `<div id="${nb}_o_${i}" action="${outputsActions[i]}" type="o" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -right-3" style="top: ${i*2+0.25}rem"></div>`
    r += `<p class="absolute" style="left: 1.25rem; top: ${h-0.75}rem; bottom: ${h-0.75}rem">${name}</p></div>`
    document.getElementById("content").innerHTML += r
    nb++
    //update_joint()
}

function create_block() {
    var outputsActions = []
    for (let i = 0; i < output_nb; i++) {
        outputsActions.push(trace_path(`O_${i}`))
    }
    add_block(new Block(Array(input_nb).fill(0), Array(output_nb).fill(0), outputsActions[0]), outputsActions, outputsActions[0])
}
//add_input_point()
// add_input_point()
add_block(AND, ["01&"], "AND")
    // add_block(NOT)
    // add_block(OR)
    // add_output_point()
    // add_input_point()
var element_dragged

function element_drag(event) {
    element_dragged = event.path[0].id
}

function drop(event) {
    if (event.path[0].id == "button_block") {
        delete_block(element_dragged)
    } else {
        var dm = document.getElementById(element_dragged);
        dm.style.left = event.clientX - 60 + 'px';
        dm.style.top = event.clientY - 30 + 'px';
    }
    update_joint()
    event.preventDefault();
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
}

function update_joint() {
    document.getElementById("svg_joint").innerHTML = ""
    links.forEach(link => {
        var pos1 = document.getElementById(link[0]).getBoundingClientRect()
        var pos2 = document.getElementById(link[1]).getBoundingClientRect()
        document.getElementById("svg_joint").innerHTML += `<line id="line-${link[0]}-${link[1]}"" onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
    });
    update()
}

function delete_joint(e) {
    var idsep = e.path[0].id.split('-')
    for (let i = 0; i < links.length; i++) {
        console.log(links[i], [idsep[1], idsep[2]])
        if (JSON.stringify(links[i]) == JSON.stringify([idsep[1], idsep[2]])) {
            links.splice(i, 1)
            break;
        }
    }
    update_joint()
    update()
}

function change_input_value(id) {
    v = document.getElementById(id).getAttribute("value")
    document.getElementById(id).setAttribute("value", Number(!parseInt(v)))
    if (v == 0) {
        document.getElementById(id).classList.add("bg-red-500")
        document.getElementById(id).classList.remove("bg-white")
    } else {
        document.getElementById(id).classList.remove("bg-red-500")
        document.getElementById(id).classList.add("bg-white")
    }
    update()
}

window.addEventListener("resize", update_joint)