var nb_of_input_enter = 0
var nb_of_input_exit = 0

function add_input_point() {
    nb_of_input_enter++
    document.getElementById("enter_points").innerHTML += `
    <div class="z-20 flex inline-flex items-center">
        <button id="input_enter${nb_of_input_enter}" onclick="change_value_enter_point(event)" value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="output_enter${nb_of_input_enter}" onclick="create_joint(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    update_joint()
}

function add_output_point() {
    nb_of_input_exit++
    document.getElementById("exit_points").innerHTML += `
    <div class="z-20 flex inline-flex items-center">
        <button id="input_exit${nb_of_input_exit}" value="2" onclick="create_joint(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="output_exit${nb_of_input_exit}" value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    update_joint()
}

var and_block = []
var or_block = []
var not_block = []

function add_and() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="and_${and_block.length}" class="z-30 absolute top-1/2 left-1/2 bg-blue-600 w-20 h-16 ">
        <div onclick="create_joint(event)" id="and_input_first_${and_block.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" id="and_input_second_${and_block.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 bottom-1"></div>
        <div onclick="create_joint(event)" value="0" id="and_output_${and_block.length}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-5"></div>
        <p class="absolute inset-5">AND</p>
    </div>`
    and_block.push(document.getElementById(`and_${and_block.length}`))
}

function add_or() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="or_${or_block.length}" class="z-30 absolute top-1/2 left-1/2 bg-green-600 w-20 h-16 ">
        <div onclick="create_joint(event)" id="or_input_first_${or_block.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" id="or_input_second_${or_block.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 bottom-1"></div>
        <div onclick="create_joint(event)" value="0" id="or_output_${or_block.length}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-5"></div>
        <p class="absolute inset-5">OR</p>
    </div>`
    or_block.push(document.getElementById(`or_${or_block.length}`))
}

function add_not() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="not_${not_block.length}" class="z-30 absolute top-1/2 left-1/2 bg-red-800 w-20 h-8 ">
        <div onclick="create_joint(event)" id="not_input_${not_block.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" value="0" id="not_output_${not_block.length}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-1"></div>
        <p class="absolute inset-x-5 inset-y-1">NOT</p>
    </div>`
    not_block.push(document.getElementById(`not_${not_block.length}`))
}

function change_value_enter_point(e) {
    if (e.path[0].value == 1) {
        e.path[0].value = 0
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).value = 0
        e.path[0].classList.remove('bg-red-600')
        e.path[0].classList.add('bg-white')
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).classList.remove('bg-red-600')
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).classList.add('bg-white')
    } else {
        e.path[0].value = 1
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).value = 1
        e.path[0].classList.remove('bg-white')
        e.path[0].classList.add('bg-red-600')
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).classList.remove('bg-white')
        document.getElementById(`output_enter${e.path[0].id.match(/\d+/)[0]}`).classList.add('bg-red-600')
    }
    update_joint()
}

var is_creating_joint = false
var x1, x2, y1, y2, joint_with
var joint = []

function create_joint(event) {
    if (is_creating_joint) {
        is_creating_joint = !is_creating_joint
        var pos = document.getElementById(event.path[0].id).getBoundingClientRect()
        if (joint_with != event.path[0].id && !(joint_with.includes("input") && event.path[0].id.includes("input"))) {
            x2 = pos.left
            y2 = pos.top
                //si le premier point cliqué est un input 
                //alors on echange les valuers des deux points
            if (joint_with.includes("input")) {
                var rem_x1 = x1
                var rem_y1 = y1
                x1 = x2
                y1 = y2
                x2 = rem_x1
                y2 = rem_y1
            }
            console.log(document.getElementById(event.path[0].id).value)
            if (event.path[0].id.includes("input")) {
                if (document.getElementById(event.path[0].id).value != 1 && document.getElementById(event.path[0].id).value != 0) {
                    document.getElementById("svg_joint").innerHTML += `
                    <line onclick="delete_joint(event, ${joint.length})" class="z-30" value="0" id="joint${joint.length}-${joint_with}-${event.path[0].id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                    joint.push(document.getElementById(`joint${joint.length}-${joint_with}-${event.path[0].id}`))
                    document.getElementById(event.path[0].id).setAttribute("value", 0)
                } else {
                    console.log("ce point a deja un lien or il ne peu en avoir qu'un seul")
                }
            } else {
                if (document.getElementById(joint_with).value != 1 && document.getElementById(joint_with).value != 0) {
                    document.getElementById("svg_joint").innerHTML += `
                    <line onclick="delete_joint(event, ${joint.length})" class="z-30" value="0" id="joint${joint.length}-${event.path[0].id}-${joint_with}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                    joint.push(document.getElementById(`joint${joint.length}-${event.path[0].id}-${joint_with}`))
                    document.getElementById(joint_with).setAttribute("value", 0)
                }
            }
        }
    } else {
        is_creating_joint = !is_creating_joint
        var pos = document.getElementById(event.path[0].id).getBoundingClientRect()
        x1 = pos.left
        y1 = pos.top
        joint_with = event.path[0].id
    }
}

var element_dragged

function element_drag(event) {
    element_dragged = event.path[0].id
}

function drop(event) {
    var dm = document.getElementById(element_dragged);
    dm.style.left = event.clientX - 60 + 'px';
    dm.style.top = event.clientY - 30 + 'px';
    event.preventDefault();
    update_joint()
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
}


function delete_joint(event, i) {
    document.getElementById(event.path[0].id).parentNode.removeChild(document.getElementById(event.path[0].id))
    document.getElementById(event.path[0].id.split("-")[2]).value = 2
    document.getElementById(event.path[0].id.split("-")[2]).classList.remove('bg-red-600')
    document.getElementById(event.path[0].id.split("-")[2]).classList.add('bg-white')
    joint[i] = undefined
}

setInterval(function() {
    and_block.forEach(block => {
        var block_nb = block.id.match(/\d+/)[0]
        var input1 = document.getElementById(`and_input_first_${block_nb}`)
        var input2 = document.getElementById(`and_input_second_${block_nb}`)
        var output = document.getElementById(`and_output_${block_nb}`)
        if (input1.value == 1 && input2.value == 1) {
            output.value = 1
            output.classList.remove('bg-white')
            output.classList.add('bg-red-600')
        } else {
            output.value = 0
            output.classList.remove('bg-red-600')
            output.classList.add('bg-white')
        }
    });
    or_block.forEach(block => {
        var block_nb = block.id.match(/\d+/)[0]
        var input1 = document.getElementById(`or_input_first_${block_nb}`)
        var input2 = document.getElementById(`or_input_second_${block_nb}`)
        var output = document.getElementById(`or_output_${block_nb}`)
        if (input1.value == 1 || input2.value == 1) {
            output.value = 1
            output.classList.remove('bg-white')
            output.classList.add('bg-red-600')
        } else {
            output.value = 0
            output.classList.remove('bg-red-600')
            output.classList.add('bg-white')
        }
    });
    not_block.forEach(block => {
        var block_nb = block.id.match(/\d+/)[0]
        var input1 = document.getElementById(`not_input_${block_nb}`)
        var output = document.getElementById(`not_output_${block_nb}`)
        if (input1.value == 0) {
            output.value = 1
            output.classList.remove('bg-white')
            output.classList.add('bg-red-600')
        } else {
            output.value = 0
            output.classList.remove('bg-red-600')
            output.classList.add('bg-white')
        }
    });
    update_joint()
}, 250)

function update_joint() {
    for (var i = 0; i < joint.length; i++) {
        if (joint[i] != undefined) {
            joint_element = joint[i]
            var input = joint_element.id.split("-")[1]
            var output = joint_element.id.split("-")[2]
            var pos1 = document.getElementById(input).getBoundingClientRect()
            var pos2 = document.getElementById(output).getBoundingClientRect()
            joint_element.setAttribute("x1", pos1.left)
            joint_element.setAttribute("y1", pos1.top)
            joint_element.setAttribute("x2", pos2.left)
            joint_element.setAttribute("y2", pos2.top)
                //update the joint_element value
            if (document.getElementById(input).value == 1) {
                document.getElementById(output).value = 1
                document.getElementById(output).classList.remove('bg-white')
                document.getElementById(output).classList.add('bg-red-600')
                joint_element.value = 1
                joint_element.style.stroke = "#B91C1C"
            } else {
                document.getElementById(output).value = 0
                document.getElementById(output).classList.remove('bg-red-600')
                document.getElementById(output).classList.add('bg-white')
                joint_element.value = 0
                joint_element.style.stroke = "#ffffff"
            }
            if (output.includes("input_exit")) {
                var output_exit = document.getElementById(`output_exit${output.match(/\d+/)[0]}`)
                if (document.getElementById(output).value == 1) {
                    output_exit.classList.remove('bg-white')
                    output_exit.classList.add('bg-red-600')
                    output_exit.value = 1
                } else {
                    output_exit.classList.remove('bg-red-600')
                    output_exit.classList.add('bg-white')
                    output_exit.value = 1
                }
            }
            document.getElementById(joint_element.id).parentNode.removeChild(document.getElementById(joint_element.id))
            document.getElementById("svg_joint").appendChild(joint_element)
            joint[i] = joint_element
        }
    };
}