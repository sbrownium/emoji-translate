// Constants
const url = 'https://emoji-api.com/emojis?';
const key = 'access_key=fc062eb11e8e980a8b77a13aad5e6d8478e91d38';
const emoWrap = document.querySelector('#emojiWrapper');
const form = document.querySelector('form');
const inputText = document.querySelector('#textTrans');
const outputText = document.querySelector('#emoTrans');
const translateBtn = document.querySelector('#translateBtn');
// const word1 = document.querySelector('#word1');
// const emo1 = document.querySelector('#emo1');
const filterField = document.querySelector('#filterContainer');
const resetBtn = document.querySelector('#resetBtn');
const autoBtn = document.querySelector('#autoBtn');
const outputContainer = document.querySelector('#wordToEmoContainer');
const createManBtn = document.querySelector('#createManBtn')
const hideManBtn = document.querySelector('#hideManBtn');
// const word1 = document.querySelector('#word1');
// const emo1 = document.querySelector('#emo1');
// const word2 = document.querySelector('#word2');
// const emo2 = document.querySelector('#emo2');
// const word3 = document.querySelector('#word3');
// const emo3 = document.querySelector('#emo3');

// Event Listeners
emoWrap.addEventListener('click', selectEmoji);
window.addEventListener('load', generateEmoji);
translateBtn.addEventListener('click', manTrans);
filterField.addEventListener('change', filter);
resetBtn.addEventListener('click', clearFilters)
// inputText.addEventListener('change', target)
autoBtn.addEventListener('click', autoTrans)
createManBtn.addEventListener('click', showManual)
hideManBtn.addEventListener('click', showManual)


// Functions
function showManual(e){
    e.preventDefault();
    const emo = document.querySelectorAll('.emoContainer');
    emo.forEach(i => {
        if (i.classList.contains('visible')) {
            i.classList.remove('visible')
        }
    })
    outputContainer.classList.toggle('hidden');
    translateBtn.classList.toggle('hidden');
    filterField.classList.toggle('hidden');
    if (hideManBtn.classList.contains('hidden')) {
        hideManBtn.classList.remove('hidden');
        createManBtn.classList.add('hidden');
    } else {
        hideManBtn.classList.add('hidden');
        createManBtn.classList.remove('hidden');
    }
    emo.forEach(i => {
       if (filterField.classList.contains('hidden')){
            i.classList.add('hidden')
        } else {
            i.classList.remove('hidden')
        }
    })
    const checkBox = document.querySelectorAll('#filterContainer input'); 
    checkBox.forEach(box => {
        if (box.checked) {
            box.checked = false
        }  
    }) 
    
}

function generateEmoji () {
    fetch(url + key)
    .then(res => res.json())
    .then(data => {
        data.forEach(({character, unicodeName, codePoint, group, subGroup}) => {
            const newEmo = document.createElement('div');
            newEmo.classList.add('emoContainer');
            newEmo.classList.add('hidden');
            newEmo.innerText = character;
            newEmo.setAttribute('title', unicodeName);
            newEmo.setAttribute('data-codePoint', codePoint);
            newEmo.setAttribute('data-group', group);
            newEmo.setAttribute('data-subGroup', subGroup);
            if (!newEmo.title.startsWith('E')){
                emoWrap.appendChild(newEmo);
            }
            }
        )
    })
}

function selectEmoji (e) {
    e.preventDefault();
    const emo = e.target;
    const word1 = document.querySelector('#word1');
    const emo1 = document.querySelector('#emo1');
    const word2 = document.querySelector('#word2');
    const emo2 = document.querySelector('#emo2');
    const word3 = document.querySelector('#word3');
    const emo3 = document.querySelector('#emo3');
    // const emoField = document.querySelector('#emo1');
    if ((word1.value && !word2.value && !word3.value) || (!emo1.value)){
        emo1.value = emo.innerText
    } 
    if ((word1.value && emo1.value && word2.value && !word3.value ) || (emo1.value && word2.value && !emo2.value)){ //|| (emo1.value && emo2.value)) {
        emo2.value = emo.innerText
    } 
    if ((word1.value && emo1.value && word2.value && emo2.value && word3.value) || (emo1.value && emo2.value && word3.value && !emo3.value)){
        emo3.value = emo.innerText
    }
    // emoField.value = emo.innerText;
}

function manTrans (e) {
    e.preventDefault();
    outputText.value = inputText.value.replaceAll(word1.value, emo1.value)
    .replaceAll(word2.value, emo2.value)
    .replaceAll(word3.value, emo3.value);
}

function filter(e) {
    e.preventDefault();
    const emo = document.querySelectorAll('.emoContainer');
    const checkBox = document.querySelectorAll('#filterContainer input');
    const checkedBox = []
    checkedBox.length = 0;
    checkBox.forEach(b => {
        if (b.checked) {
            checkedBox.push(b.id)
          }})
          reset();
    if (checkedBox.length) {
        checkBox.forEach(box => {
            if (box.checked) {
                emo.forEach(i => {
                     if (box.id === i.dataset.group) {
                     i.classList.add('visible');   
                    }
                    else if (!i.classList.contains('visible')) {
                        i.classList.add('hidden');
                    }
                })
            } 
        })
    }
}

function reset () {
    const emo = document.querySelectorAll('.emoContainer');
    emo.forEach(i => {
        if (i.classList.contains('hidden')) {
            i.classList.remove('hidden')
        } else if 
        (i.classList.contains('visible')) {
            i.classList.remove('visible')
        }
    });
}

function clearFilters (e) {
    e.preventDefault();
    reset();
    const checkBox = document.querySelectorAll('#filterContainer input'); 
    checkBox.forEach(box => {
        if (box.checked) {
            box.checked = false
        }  
    }) 
}

let inputArray = []
let outputArray = []
let emojiObj = {}
function autoTrans (e) {
    const space = ' ';
    const emo = document.querySelectorAll('.emoContainer');
    e.preventDefault();
    outputArray = [];
    inputArray = inputText.value.split(space);
    emo.forEach(i => {
        // i.title.toLowerCase().split(space).forEach(key => {
        i.title.split(space).forEach(key => {
            emojiObj[key] = i.textContent
         })
     })
     inputArray.forEach(word => {
        // if (emojiObj[word.toLowerCase()]) {
        if (emojiObj[word]) {
            outputArray.push(emojiObj[word])
        }
        else {
            outputArray.push(word)
        }
     })
     outputText.value = outputArray.join(space)
 }


/* References 
https://www.w3schools.com/html/html_css.asp
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit
https://stackoverflow.com/questions/5286663/wrapping-text-inside-input-type-text-element-html-css
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
https://emoji-api.com/
https://www.geeksforgeeks.org/what-are-custom-attributes-in-html5/
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
https://www.geeksforgeeks.org/how-to-check-uncheck-the-checkbox-using-javascript/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object
https://linuxhint.com/convert-array-to-string-without-commas-javascript/
*/