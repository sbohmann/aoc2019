import {readLines} from '../../common/io.js'
import Relation from './relation.js'

function solveA() {
    let relations = readLines('input.txt')
        .map(Relation)
    relations
        .forEach(relation => {
            console.log(relation.color + ':')
            relation.contained.forEach(contained => console.log(contained.number, contained.color))
            console.log()
        })
}

solveA()
