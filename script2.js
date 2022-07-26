var parser = new DOMParser();
import { emojis, animalImages } from "./icons.js";

class CustomModal {
    constructor(htmlString, inputs, updates){
        this.html = parser.parseFromString(htmlString, 'text/html').querySelector('div')
        this.inputs = inputs
        this.inputValues = {} 
        this.createInputsArray()
        this.updates = updates
    }

    createInputsArray(){
        for(let input of this.inputs){
            if(input.type === 'multipleselect'){
                this.inputValues[input.id] = []    
            }
            else this.inputValues[input.id] = ''
        }     
    }

    appendInput(htmlString, id){
        let input = parser.parseFromString(htmlString, 'text/html').querySelector('input')
        input.classList.add(`${id}_input`)
        input.addEventListener('change', () => {
            this.inputValues[id] = input.value
            document.querySelector(`#${id}_input_error`).classList.add(`hidden`)
        })
        this.html.querySelector(`#${id}_input_container`).appendChild(input)
       
    }


    appendButton(htmlString, id, onClick){
        let button = parser.parseFromString(htmlString, 'text/html').querySelector('button')
        button.classList.add(`${id}_button`)
        if(onClick){
            input.addEventListener('click', onClick)
        }

        this.html.querySelector(`#${id}_button_container`).appendChild(button)
    
    }

    appendSingleSelectionInput(htmlString, name){
        let options = parser.parseFromString(htmlString, 'text/html').querySelectorAll(`[data-group="${name}"]`)
        
        // let options = optionsContainer.querySelectorAll(`[data-group="${name}"]`)
        for (let i of options){
            this.html.querySelector(`#${name}_input_container`).appendChild(i)
            i.addEventListener('click', () => {
                document.querySelector(`#${name}_input_error`).classList.add(`hidden`)
                if(i.classList.contains('selected')){
                    i.classList.remove('selected')
                    this.inputValues[name] = ''
                }
                else {
                    i.classList.add('selected')
                    this.inputValues[name] = i.getAttribute('data-value')
                }
                for(let j of options){
                    if(j !== i){
                        j.classList.remove('selected')
                    }
                }
            })
        }

       
    }


    appendMultipleSelectionInput(htmlString, name){
        let options = parser.parseFromString(htmlString, 'text/html').querySelectorAll(`[data-group="${name}"]`)
        
        // let options = optionsContainer.querySelectorAll(`[data-group="${name}"]`)
        for (let i of options){
            this.html.querySelector(`#${name}_input_container`).appendChild(i)
            i.addEventListener('click', () => {
                document.querySelector(`#${name}_input_error`).classList.add(`hidden`)
                if(i.classList.contains('selected')){
                    i.classList.remove('selected')
                    this.inputValues[name] = this.inputValues[name].filter(item => item !== i.getAttribute('data-value'))
                }
                else {
                    i.classList.add('selected')
                    this.inputValues[name].push(i.getAttribute('data-value'))
                }
            })
        }

        
    }


    addButtonEventListner(id, listner){
        let button = this.html.querySelector(`.${id}_button`)
        button.addEventListener('click', listner)
    }


    remove(animations = [], delay = 0){
        
        this.applyAnimation(animations)
    
        let timeOutId = setTimeout(() => {
            document.body.removeChild(this.html)
            clearTimeout(timeOutId)
        }, delay * 1000)

    }

    display(animations = [], delay = 0){
        this.updateModel()
        // this.applyAnimation(animations)
        let timeOutId = setTimeout(() => {
            document.body.appendChild(this.html)
            this.applyAnimation(animations, delay)
            clearTimeout(timeOutId)
        }, delay * 1000)
        
    }

    saveInputsToLocalStorage(){

        let model_inputs = JSON.parse(localStorage.getItem("model_inputs"))
        if(model_inputs === null){
            model_inputs = {}
        }

        for(let input of this.inputs){
            let value = this.inputValues[input.id]
            if(value === '' || (value.length && value.length === 0)){
                document.querySelector(`#${input.id}_input_error`).classList.remove(`hidden`)
                return false
            }
            localStorage.setItem(input.name, value)
            //saving into inputs json
            model_inputs[input.name] = value
        }
        localStorage.setItem("model_inputs", JSON.stringify(model_inputs))
        return true
    }

    updateModel(){
  
        if(this.updates.length > 0){
            for(let update of this.updates){
                let updatedVal = localStorage.getItem(update.storageItemName)

                if(updatedVal){
                    
                    let elements = this.html.querySelectorAll(`.${update.id}`)
                    if(update.updateElementType === 'image'){
                        for(let i of elements){
                            i.src = animalImages[updatedVal]
                        }
                    }
                    else if(update.updateElementType === 'emoji'){
                        for(let i of elements){
                           i.innerHTML = emojis[updatedVal]
                        }
                    }
                    else{
                        for(let i of elements){
                            i.innerHTML = updatedVal
                        }
                    }

                }
            }
        }
    }


    applyAnimation(animations){
        for(let animation of animations){
            let duration = animation.duration ? animation.duration : 0
            let delay = animation.delay ? animation.delay : 0

            let element = animation.class === 'container' ? this.html : this.html.querySelector(`.${animation.class}`)

            element.style.transitionDuration = animation.duration + 's'
            element.style.transitionDelay = animation.delay + 's'
            element.style.animationDuration = animation.duration + 's'
            element.style.animationDelay = animation.delay + 's'
            element.classList.add(animation.type)

            let timeOutId = setTimeout(() => {
                element.classList.remove(animation.type)
                clearTimeout(timeOutId)
            }, ((duration + delay) * 1000) + 300)
           

        }
    }
    
}


export const createModalTemplate = ({title={}, description={}, background, inputs = [], navigationButtons, closeButton, updates = []}) => {

    let modal = new CustomModal(`
        <div class = 'container bg-white w-full max-w-[676px] h-[100vh] md:h-[90vh] md:my-[5vh] p-4 sm:p-16 rounded-[8px] flex flex-col font-["Roboto"] fixed md:right-8 top-0' 
            style="box-shadow: 0px 4px 16px rgba(12, 17, 53, 0.05)">
            ${background ? `<img src = '${background}' class = 'absolute top-[0px] left-[0px] ${background.class}' />` : ''}          
            <div id = '${closeButton.id}_button_container' class = 'w-full h-[32px] mb-10'></div>
            <div class='flex flex-col content'>
                <div class = 'flex flex-col'>
                    ${title.text ? `<h1 class='title font-[500] text-[40px] mb-8 ${title.class}'>${title.text}</h1>`:''}
                    ${title.html ? `<div class='title font-[500] text-[40px] mb-8 ${title.class}'>${title.html}</div>`: ''}
                    ${description.text ? `<p class='description leading-[24px] mb-8 ${description.class}'>${description.text}</p>`: ''}
                    ${description.html ? `<div class='description leading-[24px] mb-8 ${description.class}'>${description.html}</div>`: ''}
                    <div class = 'inputs'>
                        ${inputs && inputs.map(input => {
                                if(input.label){
                                    return `<label for = '${input.id}_input_container' class = 'mb-2 block font-[500] tracking-[150%] text-[#0C1135] mb-2'>${input.label}</label>
                                            <div class='hidden mb-2 bg-[#FCE9EE] border-[#EA638C] border-[1px] p-4 rounded-[8px]' id="${input.id}_input_error">${input.errorMessage ? input.errorMessage : input.name+' is required'}</div>
                                            <div id='${input.id}_input_container' class='w-full ${input.containerClass && input.containerClass}'></div>`
                                }
                                else{
                                    return `<div class='hidden mb-2 bg-[#FCE9EE] border-[#EA638C] border-[1px] p-4 rounded-[8px]' id="${input.id}_input_error">${input.errorMessage ? input.errorMessage : input.name+' is required'}</div>
                                    <div id='${input.id}_input_container' class='w-full ${input.containerClass && input.containerClass}'></div>`
                                }
                        }).join('')}
                    </div>
                </div>
            </div>

            <div class='flex mt-auto'>
                ${navigationButtons.map(button => `<div id='${button.id}_button_container' class = 'mr-3'></div>`).join('')}
            </div>

        </div>
    `, inputs, updates)



    for (let input of inputs){
        switch(input.type){

            case 'singleselect':
                modal.appendSingleSelectionInput(`
                    ${input.values ? input.values.map(value => {
                        if(value.image){
                            return `
                            <div class = 'cursor-pointer p-3 border-[2px] border-[#ECE9FC] rounded-[8px] ${input.class && input.class}' data-group = '${input.id}' data-value = '${value.value}'>
                                <img src = '${value.image}' class = ${value.imageClass ? value.imageClass : 'w-full h-full'} alt = ${value.name}/>
                                <span>${value.name}</span>
                                ${value.description ? `<p class = 'mt-1 text-[#0C1135]'>${value.description}</p>` : ''}
                            </div>`
                        }
                        else return `<div class = 'cursor-pointer p-3 border-[2px] border-[#ECE9FC] rounded-[8px] ${input.class && input.class}' data-group = '${input.id}' data-value = '${value.value}'>
                                        <span>${value.name}</span>
                                        ${value.description ? `<p class = 'mt-1 text-[#0C1135]'>${value.description}</p>` : ''}
                                    </div>`
                    }).join('') : ''}
                `, input.id)
                break;

            case 'text':
                modal.appendInput(`<input type="text" placeholder="Enter your name" />`, input.id)
                break;
            case 'password':
                modal.appendInput(`<input type="password" placeholder="Enter your password" />`, input.id)
                break;
            case 'age':
                modal.appendInput(`<input type="text" placeholder="Enter your Age" class = 'w-full mb-6 p-3 border-[1px] border-[#ECE9FC] rounded-[8px] ${input.class && input.class}'/>`, input.id)
                break;
            case 'multipleselect':
                modal.appendMultipleSelectionInput(`
                    ${input.values ? input.values.map(value => {
                        if(value.image){
                            return `
                            <div class = 'cursor-pointer p-3 border-[2px] border-[#ECE9FC] rounded-[8px] ${input.class && input.class}' data-group = '${input.id}' data-value = '${value.value}'>
                                <img src = '${value.image}' class = ${value.imageClass ? value.imageClass : 'w-full h-full'} alt = ${value.name}/>
                                <span>${value.name}</span>
                                ${value.description ? `<p class = 'mt-1 text-[#0C1135]'>${value.description}</p>` : ''}
                            </div>`
                        }
                        else return `<div class = 'cursor-pointer p-3 border-[2px] border-[#ECE9FC] rounded-[8px] ${input.class && input.class}' data-group = '${input.id}' data-value = '${value.value}'>
                                        <span>${value.name}</span>
                                        ${value.description ? `<p class = 'mt-1 text-[#0C1135]'>${value.description}</p>` : ''}
                                    </div>`
                    }).join('') : ''}
                `, input.id)
                break;
            
        }

    }

    navigationButtons.map(button => {
        if(button.type === 'type2'){
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-[#6D53E4] bg-[#E2DDFA] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
            
        }  
        else{
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-white bg-[#6D53E4] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
           
        }

    })

    modal.appendButton(`
        <button>
            <svg class = '${closeButton.class ? closeButton.class :'w-[16px] h-[16px]'} text-[#938FA8]' viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_410_3491)">
                <path d="M2.34338 13.6569C2.53091 13.8444 2.78527 13.9497 3.05048 13.9497C3.3157 13.9497 3.57005 13.8444 3.75759 13.6569L7.88238 9.53206C7.91364 9.50081 7.95603 9.48325 8.00023 9.48325C8.04443 9.48325 8.08683 9.50081 8.11808 9.53207L12.2429 13.6569C12.4304 13.8444 12.6848 13.9497 12.95 13.9497C13.2152 13.9497 13.4695 13.8444 13.6571 13.6569C13.8446 13.4693 13.95 13.215 13.95 12.9497C13.95 12.6845 13.8446 12.4302 13.6571 12.2426L9.5323 8.11785C9.50104 8.0866 9.48348 8.0442 9.48348 8C9.48348 7.9558 9.50104 7.9134 9.5323 7.88215L13.6571 3.75736C13.8446 3.56982 13.95 3.31547 13.95 3.05025C13.95 2.78504 13.8446 2.53068 13.6571 2.34315C13.4695 2.15561 13.2152 2.05025 12.95 2.05025C12.6848 2.05025 12.4304 2.15561 12.2429 2.34315L8.11808 6.46793C8.08683 6.49919 8.04443 6.51675 8.00023 6.51675C7.95603 6.51675 7.91364 6.49919 7.88238 6.46794L3.75759 2.34315C3.57005 2.15561 3.3157 2.05025 3.05048 2.05025C2.78527 2.05025 2.53091 2.15561 2.34338 2.34315C2.15584 2.53068 2.05048 2.78504 2.05048 3.05025C2.05048 3.31547 2.15584 3.56982 2.34338 3.75736L6.46817 7.88215C6.49942 7.91341 6.51698 7.9558 6.51698 8C6.51698 8.0442 6.49942 8.08659 6.46817 8.11785L2.34338 12.2426C2.15584 12.4302 2.05048 12.6845 2.05048 12.9497C2.05048 13.215 2.15584 13.4693 2.34338 13.6569V13.6569Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_410_3491">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        </button>
    `, closeButton.id)
    

    return modal

}


export const createSimpleModalTemplate = ({title, description, background, navigationButtons}) => {
  
    let modal = new CustomModal(`
        <div class = 'container bg-white w-full h-full max-w-[332px] max-h-[440px] p-8 rounded-[8px] flex font-["Roboto"] fixed right-8 bottom-8' 
            style="box-shadow: 0px 4px 16px rgba(12, 17, 53, 0.05)">
            <div class='content w-full h-full flex'>
                ${background && `<img src = '${background}' class = 'absolute top-[0px] left-[0px]' />`}            
                <div id = 'Close_button_container' class = 'absolute top-8 left-8'></div>
                <div class='flex flex-col mt-auto'>
                    <h1 class='font-[500] text-[24px] leading-[133%] mb-4'>${title.text}</h1>
                    <p class='leading-[150%] mb-6'>${description.text}</p>
                    <div class='flex'>
                        ${navigationButtons.map(button => `<div id='${button.id}_button_container' class='mr-3'></div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `, [], [])



    navigationButtons.map(button => {
         if(button.type === 'type2'){
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-[#6D53E4] bg-[#E2DDFA] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
            
        }  
        else if(button.type === 'CloseButton'){
            modal.appendButton(`
                <button>
                <svg class = 'w-[16px] h-[16px] text-[#938FA8]' viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_410_3491)">
                    <path d="M2.34338 13.6569C2.53091 13.8444 2.78527 13.9497 3.05048 13.9497C3.3157 13.9497 3.57005 13.8444 3.75759 13.6569L7.88238 9.53206C7.91364 9.50081 7.95603 9.48325 8.00023 9.48325C8.04443 9.48325 8.08683 9.50081 8.11808 9.53207L12.2429 13.6569C12.4304 13.8444 12.6848 13.9497 12.95 13.9497C13.2152 13.9497 13.4695 13.8444 13.6571 13.6569C13.8446 13.4693 13.95 13.215 13.95 12.9497C13.95 12.6845 13.8446 12.4302 13.6571 12.2426L9.5323 8.11785C9.50104 8.0866 9.48348 8.0442 9.48348 8C9.48348 7.9558 9.50104 7.9134 9.5323 7.88215L13.6571 3.75736C13.8446 3.56982 13.95 3.31547 13.95 3.05025C13.95 2.78504 13.8446 2.53068 13.6571 2.34315C13.4695 2.15561 13.2152 2.05025 12.95 2.05025C12.6848 2.05025 12.4304 2.15561 12.2429 2.34315L8.11808 6.46793C8.08683 6.49919 8.04443 6.51675 8.00023 6.51675C7.95603 6.51675 7.91364 6.49919 7.88238 6.46794L3.75759 2.34315C3.57005 2.15561 3.3157 2.05025 3.05048 2.05025C2.78527 2.05025 2.53091 2.15561 2.34338 2.34315C2.15584 2.53068 2.05048 2.78504 2.05048 3.05025C2.05048 3.31547 2.15584 3.56982 2.34338 3.75736L6.46817 7.88215C6.49942 7.91341 6.51698 7.9558 6.51698 8C6.51698 8.0442 6.49942 8.08659 6.46817 8.11785L2.34338 12.2426C2.15584 12.4302 2.05048 12.6845 2.05048 12.9497C2.05048 13.215 2.15584 13.4693 2.34338 13.6569V13.6569Z" fill="currentColor"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_410_3491">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                </button>
            `, button.id)
            
        }
        else{
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-white bg-[#6D53E4] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
            
        }
    })

    return modal;
}



export const createSimpleModalTemplate2 = ({title={}, description={}, background, inputs = [], imageSource, navigationButtons, closeButton, updates = []}) => {

    let modal = new CustomModal(`
        <div class = 'container bg-white w-full max-w-[676px] h-[100vh] md:h-[90vh] md:my-[5vh] p-4 sm:p-16 rounded-[8px] flex flex-col font-["Roboto"] fixed md:right-8 top-0' 
            style="box-shadow: 0px 4px 16px rgba(12, 17, 53, 0.05)">
            ${background ? `<img src = '${background}' class = 'absolute top-[0px] left-[0px] ${background.class}' />` : ''}          
            <div id = '${closeButton.id}_button_container' class = 'w-full h-[32px] mb-10'></div>
            <div class='flex flex-col content'>
                <div class = 'flex flex-col'>
                    ${title.text ? `<h1 class='title font-[500] text-[40px] mb-8 ${title.class}'>${title.text}</h1>`:''}
                    ${title.html ? `<div class='title font-[500] text-[40px] mb-8 ${title.class}'>${title.html}</div>`: ''}
                    ${description.text ? `<p class='description leading-[24px] mb-8 ${description.class}'>${description.text}</p>`: ''}
                    ${description.html ? `<div class='description leading-[24px] mb-8 ${description.class}'>${description.html}</div>`: ''}
                </div>
                <div class='max-w-[275px]'>
                    <img src = '${imageSource}' class = 'w-[100%] h-[100%]'/>
                </div>
            </div>

            <div class='flex mt-auto'>
                ${navigationButtons.map(button => `<div id='${button.id}_button_container' class = 'mr-3'></div>`).join('')}
            </div>

        </div>
    `, [], updates)




    navigationButtons.map(button => {
        if(button.type === 'type2'){
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-[#6D53E4] bg-[#E2DDFA] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
            
        }  
        else{
            modal.appendButton(`<button class='px-8 py-4 rounded-[64px] text-white bg-[#6D53E4] font-[500] leading-4 tracking-[0.05em]'>${button.name}</button>`, button.id)
           
        }

    })

    modal.appendButton(`
        <button>
            <svg class = '${closeButton.class ? closeButton.class :'w-[16px] h-[16px]'} text-[#938FA8]' viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_410_3491)">
                <path d="M2.34338 13.6569C2.53091 13.8444 2.78527 13.9497 3.05048 13.9497C3.3157 13.9497 3.57005 13.8444 3.75759 13.6569L7.88238 9.53206C7.91364 9.50081 7.95603 9.48325 8.00023 9.48325C8.04443 9.48325 8.08683 9.50081 8.11808 9.53207L12.2429 13.6569C12.4304 13.8444 12.6848 13.9497 12.95 13.9497C13.2152 13.9497 13.4695 13.8444 13.6571 13.6569C13.8446 13.4693 13.95 13.215 13.95 12.9497C13.95 12.6845 13.8446 12.4302 13.6571 12.2426L9.5323 8.11785C9.50104 8.0866 9.48348 8.0442 9.48348 8C9.48348 7.9558 9.50104 7.9134 9.5323 7.88215L13.6571 3.75736C13.8446 3.56982 13.95 3.31547 13.95 3.05025C13.95 2.78504 13.8446 2.53068 13.6571 2.34315C13.4695 2.15561 13.2152 2.05025 12.95 2.05025C12.6848 2.05025 12.4304 2.15561 12.2429 2.34315L8.11808 6.46793C8.08683 6.49919 8.04443 6.51675 8.00023 6.51675C7.95603 6.51675 7.91364 6.49919 7.88238 6.46794L3.75759 2.34315C3.57005 2.15561 3.3157 2.05025 3.05048 2.05025C2.78527 2.05025 2.53091 2.15561 2.34338 2.34315C2.15584 2.53068 2.05048 2.78504 2.05048 3.05025C2.05048 3.31547 2.15584 3.56982 2.34338 3.75736L6.46817 7.88215C6.49942 7.91341 6.51698 7.9558 6.51698 8C6.51698 8.0442 6.49942 8.08659 6.46817 8.11785L2.34338 12.2426C2.15584 12.4302 2.05048 12.6845 2.05048 12.9497C2.05048 13.215 2.15584 13.4693 2.34338 13.6569V13.6569Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_410_3491">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        </button>
    `, closeButton.id)
    

    return modal

}