import {readLines} from '../../common/io.js'
import Container from './container.js'

function solveA(relations) {
    let containerColors = new Map()

    function addContainerColorForColor(containedColor, containerColor) {
        let list = containerColors.get(containedColor)
        if (list === undefined) {
            list = [containerColor]
            containerColors.set(containedColor, list)
        } else {
            list.push(containerColor)
        }
    }

    relations
        .forEach(container => {
            container.contained.forEach(contained => {
                addContainerColorForColor(contained.color, container.color)
            })
        })

    function addAllContainers(color, result) {
        let direct = containerColors.get(color)
        if (direct !== undefined) {
            direct.forEach(container => {
                if (!result.has(container)) {
                    result.add(container)
                    addAllContainers(container, result)
                }
            })
        }
    }

    let result = new Set()
    addAllContainers('shiny gold', result)
    console.log(result.size)
}

function solveB(relations) {
    let containerForColor = new Map()
    relations.forEach(relation => {
        if (containerForColor.has(relation.color)) {
            throw new Error()
        }
        containerForColor.set(relation.color, relation)
    })

    function containedBags(color) {
        let container = containerForColor.get(color)
        return container.contained
            .reduce(
                (sum, bag) => sum + bag.number * (1 + containedBags(bag.color)),
                0)
    }

    console.log(containedBags('shiny gold'))
}

let relations = readLines('input.txt').map(Container)

// let relations = [
//     'shiny gold bags contain 2 dark red bags.',
//     'dark red bags contain 2 dark orange bags.',
//     'dark orange bags contain 2 dark yellow bags.',
//     'dark yellow bags contain 2 dark green bags.',
//     'dark green bags contain 2 dark blue bags.',
//     'dark blue bags contain 2 dark violet bags.',
//     'dark violet bags contain no other bags.']
//     .map(Container)

solveA(relations)

solveB(relations)
