
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
   
    let title, description, inputs, background, navigationButtons, closeButton, updates;
    
    title = {text: 'Do you want to perform better at the exam?'}
    description = {text: 'Becoming aware of one´s feelings can lead to better performance in the studies.'}
    background = 'https://i.ibb.co/dk9n8RY/Vectary-texture.png'
    navigationButtons = [
        {name: 'Yes', id: 'next', type:'type1'},
        {name: 'No', id: 'no', type:'type2'},
        {name: 'Close', id: 'close', type:'CloseButton'}
    ]

    let modal1 = createSimpleModalTemplate({title, description, background, navigationButtons})
    // modal1.display('opacity', 0, 0)

    title = {text: "Let's get acquainted!"}
    description = {text: 'For a better result please give us some information about who you are:'}
    inputs = [
        {name: 'Age', id: 'age', type: 'age', label: 'Your Age'},
        {name: 'Gender', id: 'gender', type: 'singleselect', label: 'Your Gender', 
            values: [
                {value: 'Male', name: 'Male'}, {value:'Female', name: 'Female'},{value:"DontWanttoSay", name:"Don't Want to Say"}, {value:"Other", name:'Other'},
            ], 
            class: 'w-[49%] mb-[1%] text-[#6D53E4]', 
            containerClass: 'flex flex-wrap justify-between'}
    ]
    navigationButtons = [{name: 'Next', id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id: 'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal2 = createModalTemplate({title, description, inputs, navigationButtons, closeButton})
    // modal2.display('opacity', 0, 0)


    title = {text: "How do you feel right now?"}
    inputs = [
        {name: 'Feeling', id : 'feeling', type: 'singleselect', label: 'Please choose one emoji, that fits on how you are feeling.', 
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
    navigationButtons = [{name: 'Back', id: 'back', type: 'type2'}, {name: 'Next', id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id: 'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal3 = createModalTemplate({title, inputs, navigationButtons, closeButton})
    // modal3.display('opacity', 0, 0)




    title = {html: `<div class='flex flex-col'><p class='text-[70px] sm:text-[96px] bg-[#F5F7FF] rounded-[50%] w-[80%]
     max-w-[256px] aspect-square flex items-center justify-center mb-8 feeling_icon' ></p><p>Feeling "<span class = 'feeling_name'></span>"</p></div>`}
    description = 'You seem to be out of good study performance. Do want to quit or improve to better?'
    navigationButtons = [{name: 'Quit', id : 'quit', type: 'type2'}, {name: "Let's Improve", id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id:'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    updates = [{id: 'feeling_icon', storageItemName: 'Feeling', updateElementType: 'emoji'}, {id: 'feeling_name', storageItemName: 'Feeling', updateElementType: 'text'}]
    let modal4 = createModalTemplate({title, description, navigationButtons, closeButton, updates})
    // modal4.display('opacity', 0, 0)




    title = {text: "What kind of animal describes you and your mood just now?"}
    inputs = [
        {name : 'animal', id: 'animal', type: 'singleselect', label: 'Please choose one emoji, that fits on how you are feeling.', 
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
    navigationButtons = [{name: 'Back', id : 'back', type: 'type2'}, {name: "Next", id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id:'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal5 = createModalTemplate({title, inputs, navigationButtons, closeButton})
    // modal5.display('opacity', 0, 0)



    title = {html: `It is alright to be a <span class = 'animal_name'>_FEELING_ _ANIMAL_<span>`}
    description = {html:`
        When we accept our emotions and sensations, we can function better. Like at night when you're going to bed and feel tired, it is good to yawn and say I feel tired, right?<br/>
        First, take a deep breath in and breathe out. Feel your feet and how they touch the ground. Now imagine you are that <span class = 'animal_name'></span> and feel <span class='feeling_name'></span>. It is alright. What would the rabbit do in order to feel safe again? Would it look for shelter? Would it jump around? Now try what you feel is good to do.<br/>
        Now if you want to improve your performance even more you can do more exercises. Do you want to continue? 
        `}
    navigationButtons = [{name: 'Quit', id : 'quit', type: 'type2'}, {name: "Let's Improve", id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id:'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    updates = [{id: 'animal_name', storageItemName: 'animal', updateElementType: 'text'}, {id: 'feeling_name', storageItemName: 'Feeling', updateElementType: 'text'}]
    let modal6 = createModalTemplate({title, description, navigationButtons, closeButton, updates})
    // modal6.display('opacity', 0, 0)



    title = {text: "CHOOSE ONE:", class: "mb-4"}
    description = {text:'INSTRUCTIONS: Start each exercise by reading the instructions and then closing your eyes to focus better to your experience. Then do the exercise and finally open the eyes and continue studying.'}
    inputs = [
        {name: 'focus', id : 'focus', type: 'singleselect', 
            values: [
                {value: 'focus_breathe', name: 'FOCUS: BREATHE:', description: 'focus on the breathing: follow the breath…breathe in, breathe out'}, 
                {value: 'calmdownandfocus', name: 'CALM DOWN & FOCUS:', description: 'BODY: feel your body: feet, buttocks, back, hands'},
                {value: 'focus_sound', name: 'FOCUS: SOUNDS:', description: 'listen to sounds: name 3 different sounds in the environment'},
                {value: 'calmdownandfocus', name: 'CALM DOWN & FOCUS:', description: 'SENSATIONS: feel the body: name 3 different sensations'},
                {value: 'calmdown_giveyourselfahug', name: 'CALM DOWN: GIVE YOURSELF A HUG', description: 'touch the body: give yourself a hug. Hug as long as you feel a change in your feelings. '},
            ], 
            class: 'w-full text-[#6D53E4] flex flex-col mb-2', 
            containerClass: 'flex flex-col'
        }
    ]
    navigationButtons = [{name: 'Back', id: 'back', type: 'type2'}, {name: 'Next', id: 'next', type: 'nextButton'}]
    closeButton = {name: 'Close', id: 'close', type: 'closeButton', class : 'w-[32px] h-[32px]'}
    let modal7 = createModalTemplate({title, description, inputs, navigationButtons, closeButton})
    // modal7.display('opacity', 0, 0)





    let modalsArray = []

    const displayNextModal = (prevModal, nextModal, modalStep) => {
        if(prevModal.saveInputsToLocalStorage()){
            localStorage.setItem('modalStep', modalStep)
            prevModal.remove('opacity', 0.5, 0.5)
            nextModal.display('opacity', 1, 0.5)
        }
    }



    modalsArray.push(modal1)
    modalsArray.push(modal2)
    modalsArray.push(modal3)
    modalsArray.push(modal4)
    modalsArray.push(modal5)
    modalsArray.push(modal6)
    modalsArray.push(modal7)

    modal1.display()
    for(let i = 0; i < modalsArray.length - 1; i++){
        modalsArray[i].addButtonEventListner('next', () => displayNextModal(modalsArray[i], modalsArray[i + 1], i+1))
    }

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






