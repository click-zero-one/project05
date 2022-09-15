'use strict'

const $ = document


const sectionItems = $.querySelectorAll('.itemMenu')
const sections = $.querySelectorAll('.baseSectionDesign')
const panelMenu = $.querySelector('.panelMenu')
const lineSep = $.querySelector('hr')
const btnMenu = $.querySelector('.containerIconBtnMenu')
const containerItemsMenu = $.querySelector('.containerItemsMenu')
const itemsMenu = $.querySelectorAll('.itemsMenu')
const labelMenu = $.querySelector('.labelBtnMenu')
const containerBtnMenu = $.querySelector('.containerBtnMenu')
const icons = $.querySelectorAll('.iconCirc')
const windows = $.querySelector('.window')
let flagMenu = false


const menuActInBigView = (targetName) => {

    if(targetName) {

        sectionItems.forEach(element => {

            let elChild = element.firstElementChild
            let elementName = element.firstElementChild.dataset.name    

            if(targetName === elementName) {

                sections.forEach(element => {

                    if(element.id === elementName) {
            
                        elChild.style.color = getComputedStyle(element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color
                        elChild.style.fontSize = '23px'
                        elChild.nextElementSibling.style.backgroundColor = getComputedStyle(element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color
                        elChild.style.textShadow = `0px 0px 6px ${getComputedStyle(element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color}`
                        panelMenu.style.backgroundColor = getComputedStyle(element.firstElementChild.firstElementChild.firstElementChild).color
                    }
                })
            }else {

                let arraySEC = Array.from(sections)

                let indexSection = arraySEC.findIndex(element => {
                    return targetName === element.id
                })
    
                elChild.style.color = getComputedStyle(arraySEC[indexSection]).backgroundColor
                elChild.nextElementSibling.style.backgroundColor = getComputedStyle(arraySEC[indexSection]).backgroundColor
                lineSep.style.color = getComputedStyle(arraySEC[indexSection]).backgroundColor
                elChild.style.textShadow = ''
                elChild.style.fontSize = '20px'

            }
        })
    }
}

sectionItems.forEach(element => {

    element.addEventListener('click' , (event) => {

        menuActInBigView(event.target.dataset.name)
        menuActInMobileView(event.target.dataset.name)
        labelMenu.innerHTML = event.target.innerHTML
        flagMenu = true
        showMenu()  

    })
})

/********************************************************* in mobile size */

const menuActInMobileView = (targetName) => {

    if(targetName) {
            sections.forEach(Element => {

        if(targetName.toLowerCase() === Element.id) {
            
            labelMenu.style.color = getComputedStyle(Element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color
            containerBtnMenu.style.backgroundColor = getComputedStyle(Element.firstElementChild.firstElementChild.firstElementChild).color
            labelMenu.style.textShadow = `0px 0px 6px ${getComputedStyle(Element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color}`
            labelMenu.style.fontSize = '23px'
            
            icons.forEach(element => {
                element.style.backgroundColor = getComputedStyle(Element.firstElementChild.firstElementChild.firstElementChild.nextElementSibling).color
            })

            itemsMenu.forEach(element => {
                element.style.color = getComputedStyle(Element).backgroundColor
            })
            
        }
    })
    }
}

const opItemsMenu = (value) => {
    containerItemsMenu.style.opacity = value + '%'
}

const showItemsMenu = (label) => {

    itemsMenu.forEach(element => {
        if(element.innerHTML === label) {
            element.style.display = 'none'
        }else{
            element.style.display = 'block'
        }
    })

}

const showMenu = () => {

    if(!flagMenu) {
        containerItemsMenu.classList.add('containerItemsMenuInACT')
        containerItemsMenu.classList.remove('containerItemsMenuInDeACT')
        flagMenu = true
        showItemsMenu(labelMenu.innerHTML)
        opItemsMenu(100)
    }else{
        containerItemsMenu.classList.add('containerItemsMenuInDeACT')
        containerItemsMenu.classList.remove('containerItemsMenuInACT')
        flagMenu = false
        showItemsMenu(labelMenu.innerHTML)
        opItemsMenu(0)
    }
}

itemsMenu.forEach(element => {

    element.addEventListener('click' , (event) => {
        
        labelMenu.innerHTML = event.target.innerHTML
        menuActInMobileView(event.target.innerHTML)
       
        menuActInBigView(event.target.innerHTML.toLowerCase())
        showMenu()
    })
})


window.addEventListener('resize' , () => {

    windows.scrollTo(0 , 0) 
    menuActInBigView('home')
    menuActInMobileView('home')
    labelMenu.innerHTML = 'Home'
})

menuActInMobileView('home')
menuActInBigView('home')
btnMenu.addEventListener('click' , showMenu)
labelMenu.addEventListener('click' , showMenu)