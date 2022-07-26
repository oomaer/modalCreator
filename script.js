
import { createModalTemplate, createSimpleModalTemplate } from "./script2.js"

/* 
for every input we have a name
for every button we have a name
input name must be SAME in following
    1. inputs array, that is passed to the modal object
    2. [name]_input_container which is the div container for input in the modal
    3. name that is passed as argument to the appendInput function

    These steps are necassary to make the input work properly
*/





const start = () => {
   

    let title = 'User Info'
    let description = 'SOme description'
    let background = 'custom background url'

    // let inputs = [
    //     {name: 'username', type: 'text'}, 
    //     {name: 'password', type: 'text', className: 'px-4'}, 
    //     {name: 'mood', type: 'singleselect', values : ['happy', 'sad', 'angry']},
    //     {name: 'fav_animal', type: 'multipleselect', values : ['cat', 'dog', 'horse']}, 
    //     {name: 'Next', type: 'NextButton', className : 'bg-blue-400'}
    //     ]

    // let modal1 = createModalTemplate(title, description, inputs, background)

    // modal1.display('opacity', 1, 0)
    
    title = 'Do you want to perform better at the exam?'
    description = 'Becoming aware of one´s feelings can lead to better performance in the studies.'
    background = 'https://i.ibb.co/dk9n8RY/Vectary-texture.png'
    let bottomButtons = [
        {name: 'Yes', type:'YesButton', className: 'bg-blue-400'},
        {name: 'No', type:'NoButton', className: 'bg-blue-400'},
        {name: 'Close', type:'CloseButton', className: 'bg-blue-400'}
    ]

    let modal = createSimpleModalTemplate(title, description, background, bottomButtons)
    modal.display('opacity', 0, 0)

    // displayNextModal = (prevModal, nextModal, modalStep) => {
    //     if(prevModal.saveInputsToLocalStorage()){
    //         localStorage.setItem('modalStep', modalStep)
    //         prevModal.remove('opacity', 0.5, 0.5)
    //         nextModal.add('opacity', 1, 0.5)
    //     }
    // }


    // modalsArray.push(modal1)
    // modalsArray.push(modal2)
    // modalsArray.push(modal3)

    // for(let i = 0; i < modalsArray.length - 1; i++){
    //     modalsArray[i].addButtonEventListner('next', () => displayNextModal(modalsArray[i], modalsArray[i + 1], i+1))
    // }

    // let modalStep = localStorage.getItem('modalStep')
    // if(modalStep){
    //     modalsArray[modalStep].add('opacity', 1, 0)
    // }
    // else{
    //     modalsArray[0].add('opacity', 1, 0)
    // }



}

start()
// document.querySelector('.clickme').addEventListener('click', () => {
//     start()
// })






