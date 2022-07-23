var parser = new DOMParser();
var support = (function () {
	if (!window.DOMParser) return false;
	var parser = new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
})();

var textToHTML= function (str) {

	// check for DOMParser support
	if (support) {
		// var parser = new DOMParser();
		var doc = parser.parseFromString(str, 'text/html');
		// return doc.body.innerHTML;
        return doc.querySelector('input')
	}

	// Otherwise, create div and append HTML
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;

};



/* 
for every input we have a name
for every button we have a name
input name must be SAME in following
    1. inputs array, that is passed to the modal object
    2. [name]_input_container which is the div container for input in the modal
    3. name that is passed as argument to the appendInput function

    These steps are necassary to make the input work properly
*/


let styles = document.createElement('style')
styles.innerHTML = `
`
document.head.appendChild(styles)


class CustomModal {
    constructor(htmlString, inputs){
        this.html = parser.parseFromString(htmlString, 'text/html').querySelector('div')
        this.inputs = inputs
        this.inputValues = {} 
        this.createInputsArray()
    }

    createInputsArray(){
        for(let input of this.inputs){
            this.inputValues[input] = ''
        }     
    }

    appendInput(htmlString, name){
        let input = parser.parseFromString(htmlString, 'text/html').querySelector('input')
        input.classList.add(`${name}_input`)
        input.addEventListener('change', () => {
            this.inputValues[name] = input.value
            document.querySelector(`#${name}_input_error`).classList.add(`hidden`)
        })
        this.html.querySelector(`#${name}_input_container`).appendChild(input)
        this.html.querySelector(`#${name}_input_container`).appendChild(
            parser.parseFromString(`<span class='hidden text-red-400' id="${name}_input_error">${name}</span>`, 'text/html').querySelector('span')
        )
    }


    appendButton(htmlString, name, onClick){

        let button = parser.parseFromString(htmlString, 'text/html').querySelector('button')
        button.classList.add(`${name}_button`)
        if(onClick){
            input.addEventListener('click', onClick)
        }
    
        this.html.querySelector(`#${name}_button_container`).appendChild(button)
    
    }

    appendSingleSelectionInput(htmlString, name){
        let optionsContainer = parser.parseFromString(htmlString, 'text/html').querySelector('div')
        
        let options = optionsContainer.querySelectorAll(`[data-group="${name}"]`)
        for (let i of options){
            i.addEventListener('click', () => {
                this.inputValues[name] = i.getAttribute('data-value')
                i.classList.add('selected')
                for(let j of options){
                    if(j !== i){
                        j.classList.remove('selected')
                    }
                }
            })
        }

        this.html.querySelector(`#${name}_input_container`).appendChild(optionsContainer)
        this.html.querySelector(`#${name}_input_container`).appendChild(
            parser.parseFromString(`<span class='hidden text-red-400' id="${name}_input_error">${name}</span>`, 'text/html').querySelector('span')
        )
    }


    addButtonEventListner(name, listner){
        let button = this.html.querySelector(`.${name}_button`)
        button.addEventListener('click', listner)
    }


    remove(animation, duration = 0.5, delay = 0){
        this.html.style.animationDuration = `${duration}s`
        if(animation === 'opacity'){
            this.html.classList.add('remove_opacity')
        }
        let timeOutId = setTimeout(() => {
            document.body.removeChild(this.html)
            clearTimeout(timeOutId)
        }, delay * 1000)

    }

    add(animation, duration = 0.5, delay = 0){
        this.html.style.animationDuration = `${duration}s`
        if(animation === 'opacity'){
            this.html.classList.add('opacity-0')
            this.html.classList.add('add_opacity')
        }
        let timeOutId = setTimeout(() => {
            document.body.appendChild(this.html)
            clearTimeout(timeOutId)
        }, delay * 1000)
        
    }

    saveInputsToLocalStorage(){
        for(let input of this.inputs){
            let value = this.inputValues[input]
            if(value === ''){
                document.querySelector(`#${input}_input_error`).innerHTML = `${input} is required`
                document.querySelector(`#${input}_input_error`).classList.remove(`hidden`)
                return false
            }
            localStorage.setItem(input, value)
        }
        return true
    }

    

}

// let modalCreator = new ModalCreator();



const start = () => {
    
    let modalsArray = []

    let inputs = ['username', 'password', 'moods']
    let modal1 = new CustomModal(`
        <div class = 'bg-gray-300 w-[600px] h-[600px]'>
            <div id = '${inputs[0]}_input_container'></div>
            <div id = '${inputs[1]}_input_container'></div>
            <div id = '${inputs[2]}_input_container'></div>
            <div id = 'next_button_container'></div>
        </div>
        
    `, inputs)

    modal1.appendInput(`<input type="text" placeholder="Enter your name" />`, inputs[0])
    modal1.appendInput(`<input type="password" placeholder="Enter your password" />`, inputs[1])
    modal1.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')


    modal1.appendSingleSelectionInput(`
        <div class = 'p-4 flex flex-wrap'>
            <div class = 'w-[25%] m-3 bg-white'>
                <div data-value = 'happy' data-group='${inputs[2]}' class = 'color-blue-400'>
                    Happy
                </div>                
            </div>
            <div class = 'w-[25%] m-3 bg-white'>
                <div data-value = 'sad' data-group='${inputs[2]}' class = 'color-blue-400'>
                    Sad
                </div>                
            </div>
            <div class = 'w-[25%] m-3 bg-white'>
                <div data-value = 'angry' data-group='${inputs[2]}' class = 'color-blue-400'>
                    Angry
                </div>                
            </div>
            <div class = 'w-[25%] m-3 bg-white'>
                <div data-value ='crying' data-group='${inputs[2]}' class = 'color-blue-400'>
                    Crying
                </div>                
            </div>
            <div class = 'w-[25%] m-3 bg-white'>
                <div data-value = 'bad' data-group='${inputs[2]}' class = 'color-blue-400'>
                   Bad 
                </div>                
            </div>
            
        </div>
    `, inputs[2])

    let modal2 = new CustomModal(`
        <div class = 'bg-gray-300 w-[300px] h-[300px]'>
            <div id = 'next_button_container'></div>
        </div>
        
    `, [])
    modal2.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')


    let modal3 = new CustomModal(`
        <div class = 'bg-blue-300 w-[500px] h-[500px]'>
            <div id = 'next_button_container'></div>
        </div>
        
    `, [])


   



    displayNextModal = (prevModal, nextModal, modalStep) => {
        if(prevModal.saveInputsToLocalStorage()){
            localStorage.setItem('modalStep', modalStep)
            prevModal.remove('opacity', 0.5, 0.5)
            nextModal.add('opacity', 1, 0.5)
        }
    }


    modalsArray.push(modal1)
    modalsArray.push(modal2)
    modalsArray.push(modal3)

    for(let i = 0; i < modalsArray.length - 1; i++){
        modalsArray[i].addButtonEventListner('next', () => displayNextModal(modalsArray[i], modalsArray[i + 1], i+1))
    }

    let modalStep = localStorage.getItem('modalStep')
    if(modalStep){
        modalsArray[modalStep].add('opacity', 1, 0)
    }
    else{
        modalsArray[0].add('opacity', 1, 0)
    }



}


document.querySelector('.clickme').addEventListener('click', () => {
    start()
})






