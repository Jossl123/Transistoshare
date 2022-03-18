function add_input_point() {
    document.getElementById("inputs_points").innerHTML += `
    <div id="${current_road.length}" l="1" class="z-20 flex inline-flex items-center">
        <button value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button onclick="create_link(event)" type="o" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    current_road += `${inputs_nb}`
    inputs_nb++
}

function add_output_point() {
    document.getElementById("outputs_points").innerHTML += `
    <div class="z-20 flex inline-flex items-center">
        <button type="i" onclick="create_link(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
}

function add_block(block) {
    //block.action.replaceAll("&", "").replaceAll("!", "").replaceAll("|", "")
    var h = Math.max(block.inputs.length, block.outputs.length)
    var r = `<div id="${current_road.length+block.action.length-1}" l="${block.action.length}" ondrag="element_drag(event)" draggable="true" class="z-30 absolute top-1/2 left-1/2 bg-blue-600 w-20" style="height: ${h*2}rem">`
    for (let i = 0; i < block.inputs.length; i++) r += `<div iN="${i+1}" type="i" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -left-3" style="top: ${i*2+0.25}rem"></div>`
    for (let i = 0; i < block.outputs.length; i++) r += `<div type="o" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -right-3" style="top: ${i*2+0.25}rem"></div>`
    r += `<p class="absolute" style="left: 1.25rem; top: ${h-0.75}rem; bottom: ${h-0.75}rem">${prompt("nom")}</p></div>`
    document.getElementById("content").innerHTML += r
    current_road += block.action.replace(/[0-9]/g, 'K')
}

function create_block() {
    add_block(new Block(Array(current_road.replaceAll("&", "").replaceAll("!", "").replaceAll("|", "").length).fill(0), [0], current_road))
}
add_input_point()
add_input_point()
add_block(AND)
add_block(NOT)
add_block(OR)
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
        var pos1 = link[0].getBoundingClientRect()
        var pos2 = link[1].getBoundingClientRect()
        document.getElementById("svg_joint").innerHTML += `<line onclick="delete_joint(event)" class="z-30" value="0" id="j" x1="${pos1.left}" y1="${pos1.top}" x2="${pos2.left}" y2="${pos2.top}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
    });
}