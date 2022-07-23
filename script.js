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

    let inputs = ['username', 'password']
    let modal1 = new CustomModal(`
        <div class = 'bg-gray-300 w-[600px] h-[600px]'>
            <div id = 'username_input_container'></div>
            <div id = 'password_input_container'></div>
            <div id = 'next_button_container'></div>
        </div>
        
    `, inputs)

    modal1.appendInput(`<input type="text" placeholder="Enter your name" />`, inputs[0])
    modal1.appendInput(`<input type="password" placeholder="Enter your password" />`, inputs[1])
    modal1.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')

    let modal2 = new CustomModal(`
        <div class = 'bg-gray-300 w-[300px] h-[300px]'>
            <div id = 'next_button_container'></div>
        </div>
        
    `, [])


    modal2.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')



    displayNextModal = (prevModal, nextModal) => {
        if(prevModal.saveInputsToLocalStorage()){
            localStorage.setItem('modalStep', '2')
            prevModal.remove('opacity', 0.5, 0.5)
            nextModal.add('opacity', 1, 0.5)
        }
    }
    
    modal1.addButtonEventListner('next', () => displayNextModal(modal1, modal2))


    modalsArray.push(modal1)
    modalsArray.push(modal2)

    let modalStep = localStorage.getItem('modalStep')
    if(modalStep){
        modalsArray[modalStep - 1].add('opacity', 1, 0)
    }
    else{
        modalsArray[0].add('opacity', 1, 0)
    }

}


document.querySelector('.clickme').addEventListener('click', () => {
    start()
})






