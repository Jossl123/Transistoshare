var nb = 0
var input_nb = 0
var output_nb = 0

function add_input_point() {
    if (input_nb > 9) return alert("You can't have more than 10 inputs")
    document.getElementById("inputs_points").innerHTML += `
    <div id="I_${input_nb}" l="1" name="" action="${input_nb}" class="z-20 flex inline-flex items-center">
        <button id="I_${input_nb}_i_0" value="0" onclick="change_input_value('I_${input_nb}_i_0')" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="I_${input_nb}_c" action="${input_nb}" onclick="create_link(event)" type="o" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    input_nb++
    update_joint()
}

function add_output_point() {
    if (output_nb > 9) return alert("You can't have more than 10 outputs")
    document.getElementById("outputs_points").innerHTML += `
    <div action="${output_nb}" class="z-20 flex inline-flex items-center">
        <button id="O_${output_nb}" action="${output_nb}" type="i" onclick="create_link(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    output_nb++
    update_joint()
}

function remove(el) {
    var element = el;
    element.remove();
}

function add_block(outputsActions, name) {
    //block.action.replaceAll("&", "").replaceAll("!", "").replaceAll("|", "")
    var inputNb = 0
    for (let i = 0; i < outputsActions.length; i++) {
        for (var char of outputsActions[i].replace(/\D+/g, "")) {
            if (parseInt(char) > inputNb) inputNb = parseInt(char)
        }
    }
    inputNb++
    var h = Math.max(inputNb, outputsActions.length)
    var r = `<div id="${nb}" ondrag="element_drag(event)" ondblclick="remove(this)" draggable="true" class="z-30 absolute top-1/2 left-1/2 bg-blue-600 w-20" style="height: ${h*2}rem">`
    for (let i = 0; i < inputNb; i++) r += `<div id="${nb}_i_${i}" type="i" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -left-3" style="top: ${i*2+0.25}rem"></div>`
    for (let i = 0; i < outputsActions.length; i++) r += `<div id="${nb}_o_${i}" action="${outputsActions[i]}" type="o" value="0" onclick="create_link(event)" class="absolute bg-white rounded-full h-6 w-6 -right-3" style="top: ${i*2+0.25}rem"></div>`
    r += `<p class="absolute" style="left: 1.25rem; top: ${h-0.75}rem; bottom: ${h-0.75}rem">${name}</p></div>`
    document.getElementById("content").innerHTML += r
    nb++
    //update_joint()
}
//add_block(["01|10&!&"], "Xor")
// add_block(["01|10&!&"], "Xor")
// add_block(["01|"], "OR")
// add_block(["01&"], "and")
// add_block(["01&"], "and")
// add_block(["01|10&!&2|201|10&!&&!&", "01|10&!&2&10&|"], "ADDER")
// add_block(["01|10&!&2|201|10&!&&!&", "01|10&!&2&10&|"], "ADDER")
// add_block(["01|10&!&2|201|10&!&&!&", "01|10&!&2&10&|"], "ADDER")
// add_block(["01|10&!&2|201|10&!&&!&", "01|10&!&2&10&|"], "ADDER")
//add_block(['04|40&!&15|51&!&26|62&!&37|73&!&8&73&|&62&|&51&||15|51&!&26|62&!&37|73&!&8&73&|&62&|&51&|04|40&!&&!&','15|51&!&26|62&!&37|73&!&8&73&|&62&||26|62&!&37|73&!&8&73&|&62&|15|51&!&&!&','26|62&!&37|73&!&8&73&||37|73&!&8&73&|26|62&!&&!&','37|73&!&8|837|73&!&&!&','01|10&!&2&10&|'], '4bitadd')
//add_block(["01|10&!&2&10&|","01&","048|84&!&|48|84&!&0&!&158|85&!&|58|85&!&1&!&268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&|&58|85&!&1&||158|85&!&|58|85&!&1&!&268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&|&58|85&!&1&|048|84&!&|48|84&!&0&!&&!&","048|84&!&|48|84&!&0&!&158|85&!&|58|85&!&1&!&268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&|&58|85&!&1&||158|85&!&|58|85&!&1&!&268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&|&58|85&!&1&|048|84&!&|48|84&!&0&!&&!&","158|85&!&|58|85&!&1&!&268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&||268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&|&68|86&!&2&|158|85&!&|58|85&!&1&!&&!&","268|86&!&|68|86&!&2&!&378|87&!&|78|87&!&3&!&8&78|87&!&3&||378|87&!&|78|87&!&3&!&8&78|87&!&3&|268|86&!&|68|86&!&2&!&&!&","378|87&!&|78|87&!&3&!&8|8378|87&!&|78|87&!&3&!&&!&"], "ALU")
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_input_point()
add_output_point()
add_output_point()
add_output_point()
add_output_point()
add_output_point()
add_output_point()
add_output_point()
links=[
['I_8_c', '3_i_1'],['I_8_c', '2_i_1'],['I_8_c', '1_i_1'],['I_8_c', '0_i_1'],['I_7_c', '3_i_0'],['I_6_c', '2_i_0'],['I_5_c', '1_i_0'],['I_4_c', '0_i_0'],['I_8_c', '4_i_8'],['3_o_0', '4_i_7']
,['2_o_0', '4_i_6']
,['1_o_0', '4_i_5']
,['0_o_0', '4_i_4']
,['I_3_c', '4_i_3']
,['I_2_c', '4_i_2']
,['I_1_c', '4_i_1']
,['I_0_c', '4_i_0']
,['4_o_3', '8_i_0']
,['4_o_2', '7_i_0']
,['4_o_1', '6_i_0']
,['4_o_0', '5_i_0']
,['4_o_4', 'O_4']
,['12_o_0', '13_i_0']
,['13_o_0', '14_i_0']
,['14_o_0', 'O_6']
,['5_o_0', '12_i_0']
,['6_o_0', '12_i_1']
,['7_o_0', '13_i_1']
,['8_o_0', '14_i_1']
,['4_o_0', 'O_5']
,['4_o_3', 'O_3']
,['4_o_2', 'O_2']
,['4_o_1', 'O_1']
,['4_o_0', 'O_0']
]

// links = [['I_0_c', '1_i_0'],['I_1_c', '1_i_1'],['I_2_c', '1_i_2'],['I_3_c', '1_i_3'],['I_4_c', '1_i_4'],['I_5_c', '1_i_5'],['I_6_c', '1_i_6'],['I_7_c', '1_i_7'],['I_8_c', '1_i_8'],['1_o_0', 'O_0']
// ,['1_o_1', 'O_1']
// ,['1_o_2', 'O_2']
// ,['1_o_3', 'O_3']
// ,['1_o_4', 'O_4']
// ,['1_o_5', 'O_5']
// ,['1_o_6', 'O_6']
// ]
// links = [
//     ['I_8_c', '3_i_2'],
//     ['3_o_1', '2_i_2'],
//     ['2_o_1', '0_i_2'],
//     ['0_o_1', '1_i_2'],
//     ['1_o_1', 'O_4'],
//     ['I_7_c', '3_i_1'],
//     ['3_o_0', 'O_3'],
//     ['I_6_c', '2_i_1'],
//     ['2_o_0', 'O_2'],
//     ['I_5_c', '0_i_1'],
//     ['0_o_0', 'O_1'],
//     ['I_4_c', '1_i_1'],
//     ['1_o_0', 'O_0'],
//     ['I_3_c', '3_i_0'],
//     ['I_2_c', '2_i_0'],
//     ['I_1_c', '0_i_0'],
//     ['I_0_c', '1_i_0']
// ]
// links = [ ['I_0_c', '0_i_0'], ['0_o_0', 'O_0'], ['0_o_1', 'O_1'], ['I_1_c', '0_i_1'], ['I_2_c', '0_i_2'], ['I_3_c', '0_i_3'], ['I_4_c', '0_i_4'], ['I_5_c', '0_i_5'], ['I_6_c', '0_i_6'], ['I_7_c', '0_i_7']
// , ['I_8_c', '0_i_8']
// , ['0_o_2', 'O_2']
// , ['0_o_3', 'O_3']
// , ['0_o_4', 'O_4']
// ]
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
}

window.addEventListener("resize", update_joint)