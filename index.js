var blocks_class = {}
var block_input_nb = {
    "inputs": {
        "AND": 2,
        "OR": 2,
        "NOT": 1
    },
    "outputs": {
        "AND": 1,
        "OR": 1,
        "NOT": 1
    }
}
var blocks_elements = {
    "AND": [],
    "OR": [],
    "NOT": []
}
var current_road = {
    "inputs": [],
    "outputs": [],
    "joints_arr": []
}

var inputs_enter_points = 0
var outputs_exit_points = 0

blocks_class.AND = class AND {
    constructor(input1, input2) {
        this.input1 = input1;
        this.input2 = input2;
        this.output1 = false
    }
    action() {
        this.output1 = this.input1 && this.input2
        return [this.output1]
    }
}
blocks_class.OR = class OR {
    constructor(input1, input2) {
        this.input1 = input1;
        this.input2 = input2;
        this.output1 = false
    }
    action() {
        this.output1 = this.input1 || this.input2
        return [this.output1]
    }
}
blocks_class.NOT = class NOT {
    constructor(input1) {
        this.input1 = input1;
        this.output1 = false
    }
    action() {
        this.output1 = !this.input1
        return [this.output1]
    }
}

function add_input_point() {
    inputs_enter_points++
    document.getElementById("enter_points").innerHTML += `
    <div class="z-20 flex inline-flex items-center">
        <button id="inputenter${inputs_enter_points}" onclick="change_value_enter_point(event)" value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="outputenter${inputs_enter_points}" onclick="create_joint(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    update_joint()
}

function add_output_point() {
    outputs_exit_points++
    document.getElementById("exit_points").innerHTML += `
    <div class="z-20 flex inline-flex items-center">
        <button id="inputexit${outputs_exit_points}" value="2" onclick="create_joint(event)" class="h-4 w-4 z-20 focus:outline-none rounded-full bg-white"></button>
        <button id="outputexit${outputs_exit_points}" value="0" class="h-8 w-8 my-1 z-20 focus:outline-none rounded-full bg-white"></button>
    </div>`
    update_joint()
}

function add_and() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="AND${blocks_elements.AND.length + 1}" class="z-30 absolute top-1/2 left-1/2 bg-blue-600 w-20 h-16 ">
        <div onclick="create_joint(event)" id="input1_AND${blocks_elements.AND.length + 1}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" id="input2_AND${blocks_elements.AND.length + 1}" class="absolute bg-white rounded-full h-6 w-6 -left-3 bottom-1"></div>
        <div onclick="create_joint(event)" value="0" id="output1_AND${blocks_elements.AND.length + 1}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-5"></div>
        <p class="absolute inset-5">AND</p>
    </div>`
    blocks_elements.AND.push(document.getElementById(`AND${blocks_elements.AND.length + 1}`))
}

function add_or() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="OR${blocks_elements.OR.length}" class="z-30 absolute top-1/2 left-1/2 bg-green-600 w-20 h-16 ">
        <div onclick="create_joint(event)" id="input1_OR${blocks_elements.OR.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" id="input2_OR${blocks_elements.OR.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 bottom-1"></div>
        <div onclick="create_joint(event)" value="0" id="output1_OR${blocks_elements.OR.length}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-5"></div>
        <p class="absolute inset-5">OR</p>
    </div>`
    blocks_elements.OR.push(document.getElementById(`OR${blocks_elements.OR.length}`))
}

function add_not() {
    document.getElementById("content").innerHTML += `
    <div ondrag="element_drag(event)" draggable="true" id="NOT${blocks_elements.NOT.length}" class="z-30 absolute top-1/2 left-1/2 bg-red-800 w-20 h-8 ">
        <div onclick="create_joint(event)" id="input1_NOT${blocks_elements.NOT.length}" class="absolute bg-white rounded-full h-6 w-6 -left-3 top-1"></div>
        <div onclick="create_joint(event)" value="0" id="output1_NOT${blocks_elements.NOT.length}" class="absolute bg-white rounded-full h-6 w-6 -right-3 inset-y-1"></div>
        <p class="absolute inset-x-5 inset-y-1">NOT</p>
    </div>`
    blocks_elements.NOT.push(document.getElementById(`NOT${blocks_elements.NOT.length}`))
}

function change_value_enter_point(e) {
    if (e.path[0].value == 1) {
        e.path[0].value = 0
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).value = 0
        e.path[0].classList.remove('bg-red-600')
        e.path[0].classList.add('bg-white')
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).classList.remove('bg-red-600')
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).classList.add('bg-white')
    } else {
        e.path[0].value = 1
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).value = 1
        e.path[0].classList.remove('bg-white')
        e.path[0].classList.add('bg-red-600')
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).classList.remove('bg-white')
        document.getElementById(`outputenter${e.path[0].id.match(/\d+/)[0]}`).classList.add('bg-red-600')
    }
    update_joint()
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


function delete_joint(event) {
    document.getElementById(event.path[0].id).parentNode.removeChild(document.getElementById(event.path[0].id))
    document.getElementById(event.path[0].id.split("-")[1]).value = 2
    document.getElementById(event.path[0].id.split("-")[1]).classList.remove('bg-red-600')
    document.getElementById(event.path[0].id.split("-")[1]).classList.add('bg-white')
    if (event.path[0].id.split("-")[0].includes("outputenter")) current_road.inputs.splice(current_road.inputs.indexOf(event.path[0].id.split("-")[0]), 1);
    if (event.path[0].id.split("-")[0].includes("inputexit")) current_road.outputs.splice(current_road.outputs.indexOf(event.path[0].id.split("-")[0]), 1);;
    if (event.path[0].id.split("-")[1].includes("outputenter")) current_road.inputs.splice(current_road.inputs.indexOf(event.path[0].id.split("-")[1]), 1);;
    if (event.path[0].id.split("-")[1].includes("inputexit")) current_road.outputs.splice(current_road.outputs.indexOf(event.path[0].id.split("-")[1]), 1);;
    current_road.joints_arr[current_road.joints_arr.indexOf(event.path[0].id)] = undefined
}

setInterval(function() {
    Object.keys(blocks_elements).forEach(blocks_element => {
        blocks_elements[blocks_element].forEach(block => {
            var block_nb = block.id.match(/\d+/)[0]
            var inputs_list = ``;
            for (let input_nb = 0; input_nb < block_input_nb.inputs[blocks_element]; input_nb++) {
                inputs_list += `${document.getElementById("input" + (input_nb + 1) + "_" + blocks_element + "" + block_nb).value},`
            }
            var outputs_list = []
            for (let output_nb = 0; output_nb < block_input_nb.outputs[blocks_element]; output_nb++) {
                outputs_list.push(document.getElementById(`output${output_nb + 1}_${blocks_element}${block_nb}`))
            }
            eval(`var result = new blocks_class[blocks_element](${inputs_list.slice(0, -1)}).action()`)
                //var result = eval(`new blocks_class.${blocks_element}(${inputs_list.substring(0,inputs_list.lenght-1)}).action()`)
            for (let output_nb = 0; output_nb < result.length; output_nb++) {
                var output = outputs_list[output_nb]
                if (result[output_nb]) {
                    output.value = 1
                    output.classList.remove('bg-white')
                    output.classList.add('bg-red-600')
                } else {
                    output.value = 0
                    output.classList.remove('bg-red-600')
                    output.classList.add('bg-white')
                }
            }
        })
    })
    update_joint()
}, 250)

function update_joint() {
    for (var i = 0; i < current_road.joints_arr.length; i++) {
        if (current_road.joints_arr[i] != undefined) {
            joint_element = document.getElementById(current_road.joints_arr[i])
            var input = joint_element.id.split("-")[0]
            var output = joint_element.id.split("-")[1]
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
            if (output.includes("inputexit")) {
                var output_exit = document.getElementById(`outputexit${output.match(/\d+/)[0]}`)
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
            current_road.joints_arr[i] = joint_element.id
        }
    };
}

var is_creating_joint = false
var x1, x2, y1, y2, joint_with

function create_joint(event) {
    if (is_creating_joint) {
        is_creating_joint = !is_creating_joint
        var pos = document.getElementById(event.path[0].id).getBoundingClientRect()
        if (joint_with != event.path[0].id && !(joint_with.includes("input") && event.path[0].id.includes("input"))) {
            x2 = pos.left
            y2 = pos.top
                //si le premier point cliqué est un input 
                //alors on echange les valuers des deux points
            console.log(current_road.inputs.includes(event.path[0].id))
            if (joint_with.includes("input")) {
                if (event.path[0].id.includes("outputenter") && !current_road.inputs.includes(event.path[0].id)) current_road.inputs.push(event.path[0].id);
                if (joint_with.includes("inputexit") && !current_road.outputs.includes(joint_with)) current_road.outputs.push(joint_with);
                var rem_x1 = x1
                var rem_y1 = y1
                x1 = x2
                y1 = y2
                x2 = rem_x1
                y2 = rem_y1
                if (document.getElementById(joint_with).value != 1 && document.getElementById(joint_with).value != 0) {
                    document.getElementById("svg_joint").innerHTML += `
                    <line onclick="delete_joint(event)" class="z-30" value="0" id="${event.path[0].id}-${joint_with}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                    current_road.joints_arr.push(`${event.path[0].id}-${joint_with}`)
                    document.getElementById(joint_with).setAttribute("value", 0)
                }
            } else {
                if (event.path[0].id.includes("inputexit") && !current_road.outputs.includes(event.path[0].id)) current_road.outputs.push(event.path[0].id);
                if (joint_with.includes("outputenter") && !current_road.inputs.includes(joint_with)) current_road.inputs.push(joint_with);
                if (document.getElementById(event.path[0].id).value != 1 && document.getElementById(event.path[0].id).value != 0) {
                    document.getElementById("svg_joint").innerHTML += `
                    <line onclick="delete_joint(event)" class="z-30" value="0" id="${joint_with}-${event.path[0].id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:rgb(255, 255, 255);stroke-width:4" />`
                    current_road.joints_arr.push(`${joint_with}-${event.path[0].id}`)
                    document.getElementById(event.path[0].id).setAttribute("value", 0)
                } else {
                    console.log("ce point a deja un lien or il ne peu en avoir qu'un seul")
                }
            }
            console.log(current_road)
        }
    } else {
        is_creating_joint = !is_creating_joint
        var pos = document.getElementById(event.path[0].id).getBoundingClientRect()
        x1 = pos.left
        y1 = pos.top
        joint_with = event.path[0].id
    }
}

function create_block() {
    var final_road = {}
    var block_name = prompt("Comment voulez vous appeller ce block ?").replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '').toLocaleUpperCase()
    if (block_name.length <= 0) return alert("Nom invalide")
    if (blocks_class[block_name]) return alert("Nom deja utilisé");
    var constructor_params = `input1`
    var constructor_assigement = `this.input1 = input1;`
    for (let i = 1; i < current_road.inputs.length; i++) {
        constructor_params += `,input${i+1}`
        constructor_assigement += `this.input${i+1} = input${i+1};`
    }
    for (let i = 0; i < current_road.outputs.length; i++) {
        constructor_assigement += `this.output${i+1} = false;`
    }

    //retrace le chemin 
    for (let i = 0; i < current_road.outputs.length; i++) {
        final_road[current_road.outputs[i]] = {}
        var memory_points_to_cross = {}
        memory_points_to_cross[current_road.outputs[i]] = [current_road.outputs[i]]
        while (Object.keys(memory_points_to_cross).length > 0) {
            Object.keys(memory_points_to_cross).forEach(memory_point => {
                var output_joined = get_output_joined(memory_point)
                memory_points_to_cross[memory_point].push(output_joined)

                var path = "final_road"
                    //write the path to the point
                memory_points_to_cross[memory_point].forEach(mem_point => {
                    path += `.${mem_point}`
                })
                path += " = {};"
                eval(path)
                path = "final_road"

                //si ce n'est pas le outputenter
                if (!output_joined.includes('outputenter')) {
                    for (let input_nb_of_the_bloc = 0; input_nb_of_the_bloc < block_input_nb.inputs[output_joined.split("_")[1].replace(/[0-9]/g, '')]; input_nb_of_the_bloc++) {
                        //pour chaque input que le bloc possède
                        var current_input = `input${input_nb_of_the_bloc+1}_${output_joined.split("_")[1]}`
                        memory_points_to_cross[current_input] = Array.from(memory_points_to_cross[memory_point])
                        memory_points_to_cross[current_input].push(current_input)
                        memory_points_to_cross[current_input].forEach(mem_point => {
                            path += `.${mem_point}`
                        })
                        path += " = {};"
                        eval(path)
                        path = "final_road"
                    }
                }
                delete memory_points_to_cross[memory_point]
            });
        }
    }
    var final_action = ""
        //create the action of the block
    Object.keys(final_road).forEach(outputs => {
        final_action += `this.output${outputs.match(/\d+/)[0]} = ${Object.keys(final_road[outputs])[0]}`
        var memory_points_to_cross = {}
        memory_points_to_cross[Object.keys(final_road[outputs])[0]] = [Object.keys(final_road[outputs])[0]]
        while (Object.keys(memory_points_to_cross).length > 0) {
            Object.keys(memory_points_to_cross).forEach(memory_point => {
                if (!memory_point.includes("outputenter")) {
                    final_action = final_action.replace(memory_point, `new blocks_class.${memory_point.split("_")[1].replace(/[^a-zA-Z ]/g, "")}(inputs${memory_point}).action()[${memory_point.match(/\d+/)[0] - 1}]`)
                    var inputs_params = ""
                    var path = "final_road[outputs]." + memory_points_to_cross[memory_point].join('.')
                    Object.keys(eval(path)).forEach(inputs => {
                        if (!Object.keys(eval(path)[inputs])[0].includes("outputenter")) {
                            memory_points_to_cross[Object.keys(eval(path)[inputs])[0]] = memory_points_to_cross[memory_point]
                            memory_points_to_cross[Object.keys(eval(path)[inputs])[0]].push(inputs)
                            memory_points_to_cross[Object.keys(eval(path)[inputs])[0]].push(Object.keys(eval(path)[inputs])[0])
                            inputs_params += `${Object.keys(eval(path)[inputs])[0]},`
                        } else {
                            inputs_params += `this.input${Object.keys(eval(path)[inputs])[0].match(/\d+/)[0]},`
                        }
                    })
                    final_action = final_action.replace(`inputs${memory_point}`, inputs_params.slice(0, -1))
                } else {
                    final_action = final_action.replace(memory_point, `this.input${memory_point.match(/\d+/)[0]}`)
                }
                delete memory_points_to_cross[memory_point]
            })

        }
        final_action += ";"
    });

    console.log(final_action)
    var output_to_return = ""
    var outputs_html = ""
    var itterations = 0
        //calculate the action of the new block...
    Object.keys(final_road).forEach(input_exit_road => {
        output_to_return += `this.output${input_exit_road.match(/\d+/)[0]},`
        outputs_html += `
        <div onclick=\'create_joint(event)\' value=\'0\' id='output${itterations + 1}_${block_name}\${blocks_elements.${block_name}.length + 1}' class=\'bg-white rounded-full h-6 w-6 m-1\'></div>
        `
        itterations++
    })
    var inputs_html = ""
    for (let i = 0; i < current_road.inputs.length; i++) {
        inputs_html += `
        <div onclick=\'create_joint(event)\' id='input${i + 1}_${block_name}\${blocks_elements.${block_name}.length + 1}' class=\'bg-white rounded-full h-6 w-6 m-1\'></div>
        `
    }
    blocks_class[block_name] = eval(`(
    class ${block_name}{
        constructor(${constructor_params}) {
            ${constructor_assigement}
        }
        action() {
            ${final_action}
            return [${output_to_return.slice(0, -1)}]
        }
    }
    )`)
    console.log(blocks_class[block_name])

    blocks_elements[block_name] = []
    block_input_nb.inputs[block_name] = current_road.inputs.length
    block_input_nb.outputs[block_name] = current_road.outputs.length
    var heigth
    if (current_road.inputs.length > current_road.outputs.length) {
        heigth = current_road.inputs.length
    } else {
        heigth = current_road.outputs.length
    }

    document.getElementById("button_block").innerHTML += `
    <button onclick="
        document.getElementById('content').innerHTML += \`
        <div ondrag='element_drag(event)' draggable='true' id='${block_name}\${blocks_elements.${block_name}.length + 1}' class='w-20 z-30 relative h-${heigth*8} flex inline-flex top-1/2 left-1/2 bg-blue-600'>
            <div class='flex flex-col -inset-x-3 absolute w-${8*current_road.inputs.length} justify-center h-full'>
            ${inputs_html}</div>
            <div class='flex flex-col ml-16 absolute w-${8*current_road.outputs.length} justify-center h-full'>
            ${outputs_html}</div>  
            <p class='absolute inset-5'>${block_name}</p>
        </div>\`
        blocks_elements.${block_name}.push(document.getElementById(\`${block_name}\${blocks_elements.${block_name}.length + 1}\`))" 
    class="m-2 text-white">${block_name}</button>`
}

function get_output_joined(current_input_point) {
    var result = "";
    current_road.joints_arr.forEach(joint => {
        if (joint && joint.includes(current_input_point)) {
            result = joint.split("-")[0]
        }
    });
    return result
}