class Block {
    constructor(inputs, outputs, action) {
        this.inputs = inputs
        this.outputs = outputs
        this.action = action
    }
    output() {
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
AND = new Block([0, 0, 0], [0], "01&2|!")
OR = new Block([0, 0], [0], "01|")
NOT = new Block([0], [0], "0!")
console.log(AND.output())