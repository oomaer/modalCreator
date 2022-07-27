
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
   
    let title, description, inputs, background, navigationButtons, closeButton;
    
    title = 'Do you want to perform better at the exam?'
    description = 'Becoming aware of one´s feelings can lead to better performance in the studies.'
    background = 'https://i.ibb.co/dk9n8RY/Vectary-texture.png'
    navigationButtons = [
        {name: 'Yes', type:'YesButton'},
        {name: 'No', type:'type2'},
        {name: 'Close', type:'CloseButton'}
    ]

    let modal1 = createSimpleModalTemplate(title, description, background, navigationButtons)
    // modal1.display('opacity', 0, 0)

    title = "Let's get acquainted!"
    description = 'For a better result please give us some information about who you are:'
    inputs = [
        {name: 'age', type: 'age', label: 'Your Age'},
        {name: 'Gender', type: 'singleselect', label: 'Your Gender', 
            values: [
                {value: 'Male', name: 'Male'}, {value:'Female', name: 'Female'},{value:"Don't Want to Say", name:"Don't Want to Say"}, {value:"Other", name:'Other'},
            ], 
            class: 'w-[49%] mb-[1%] text-[#6D53E4]', 
            containerClass: 'flex flex-wrap justify-between'}
    ]
    navigationButtons = [{name: 'Next', type: 'nextButton'}]
    closeButton = {name: 'Close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal2 = createModalTemplate({title, description, inputs, navigationButtons, closeButton})
    // modal2.display('opacity', 0, 0)


    title = "How do you feel right now?"
    description = null
    inputs = [
        {name: 'Feeling', type: 'singleselect', label: 'Please choose one emoji, that fits on how you are feeling.', 
            values: [
                {value: 'Pride', name: '😉 Pride'}, 
                {value: 'Love', name: '😍 Love'},
                {value: 'Good', name: '🙂 Good'},
                {value: 'Happiness', name: '😃 Happiness'},
                {value: 'Shame', name: '😳 Shame'},
                {value: 'Sad', name: '🙁 Sad'},
                {value: 'Fear', name: '😨 Fear️'},
                {value: 'Anger', name: '😤 Anger'},
                {value: 'Neutral', name: '😐 Neutral'},
            ], 
            class: 'w-[24%] mb-[1%] text-[#6D53E4] flex justify-center', 
            containerClass: 'flex flex-wrap justify-between'
        }
    ]
    navigationButtons = [{name: 'Back', type: 'type2'}, {name: 'Next', type: 'nextButton'}]
    closeButton = {name: 'Close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal3 = createModalTemplate({title, description, inputs, navigationButtons, closeButton})
    // modal3.display('opacity', 0, 0)




    title = "What kind of animal describes you and your mood just now?"
    description = null
    inputs = [
        {name: 'Feeling', type: 'singleselect', label: 'Please choose one emoji, that fits on how you are feeling.', 
            values: [
                {value: 'Rabbit', name: 'Rabit', image: 'https://i.ibb.co/nsqkwKw/Animals.png'}, 
                {value: 'Bear', name: 'Bear', image: 'https://i.ibb.co/CVLVHZk/Animals-1.png'},
                {value: 'Cat', name: 'Cat', image: 'https://i.ibb.co/VjL6Cj8/Animals-2.png'},
                {value: 'Dog', name: 'Dog', image: 'https://i.ibb.co/QFT4MVG/Animals-3.png'},
                {value: 'Deer', name: 'Deer', image: 'https://i.ibb.co/RYFVnDx/Animals-4.png'},
                {value: 'Elephant', name: 'Elephant', image: 'https://i.ibb.co/6JCz9pj/Animals-5.png'},
                {value: 'Fox', name: 'Fox', image: 'https://i.ibb.co/jWK6DSk/Animals-6.png'},
                {value: 'Tiger', name: 'Tiger', image: 'https://i.ibb.co/RTQx0X3/Animals-7.png'}
            ], 
            class: 'w-[24%] mb-[1%] text-[#6D53E4] flex flex-col justify-center items-center p-4 font-[500] gap-2', 
            containerClass: 'flex flex-wrap justify-between'
        }
    ]
    navigationButtons = [{name: 'Back', type: 'type2'}, {name: 'Next', type: 'nextButton'}]
    closeButton = {name: 'Close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal4 = createModalTemplate({title, description, inputs, navigationButtons, closeButton})
    modal4.display('opacity', 0, 0)










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






