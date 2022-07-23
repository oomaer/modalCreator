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



let styles = document.createElement('style')
styles.innerHTML = `
`
document.head.appendChild(styles)


class CustomModal {
    constructor(htmlString){
        this.html = parser.parseFromString(htmlString, 'text/html').querySelector('div')
    }



    appendInput(htmlString, name){
        let input = parser.parseFromString(htmlString, 'text/html').querySelector('input')
        input.addEventListener('click', () => console.log('input clicked'))
        this.html.querySelector(`#${name}_input_container`).appendChild(input)
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


    remove(animation, delay = 0){
        if(animation === 'opacity'){
            this.html.classList.add('remove_opacity')
        }
        let timeOutId = setTimeout(() => {
            document.body.removeChild(this.html)
            clearTimeout(timeOutId)
        }, delay * 1000)

    }

    add(animation, delay = 0){
        if(animation === 'opacity'){
            this.html.classList.add('opacity-0')
            this.html.classList.add('add_opacity')
        }
        let timeOutId = setTimeout(() => {
            document.body.appendChild(this.html)
            clearTimeout(timeOutId)
        }, delay * 1000)
        
    }


   

    // appendSingleInput(string, name, container){
    //     let html = parser.parseFromString(string, 'text/html').querySelector('input')
    //     html.addEventListener('click', () => console.log('input clicked'))
    //     container
    // }

    

}

// let modalCreator = new ModalCreator();



const start = () => {
    
    let inputsArray = ['username', 'password']

    let modal1 = new CustomModal(`
        <div class = 'bg-gray-300 w-[600px] h-[600px]'>
            <div id = 'username_input_container'></div>
            <div id = 'password_input_container'></div>
            <div id = 'next_button_container'></div>
        </div>
        
    `)
 

    modal1.appendInput(`<input type="text" placeholder="Enter your name" />`, 'username')
    modal1.appendInput(`<input type="password" placeholder="Enter your password" />`, 'password')
    modal1.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')

    modal1.add('opacity')

    let modal2 = new CustomModal(`
        <div class = 'bg-gray-300 w-[300px] h-[300px]'>
            <div id = 'next_button_container'></div>
        </div>
        
    `)
    modal2.appendButton(`<button class='bg-blue-400' px-5 py-4>NEXT</button>`, 'next')


    displayNextModal = (prevModal, nextModal, delay) => {
        prevModal.remove('opacity', delay)
        nextModal.add('opacity', delay)

    }
    
    modal1.addButtonEventListner('next', () => displayNextModal(modal1, modal2, 2))



}


document.querySelector('.clickme').addEventListener('click', () => {
    start()
})






