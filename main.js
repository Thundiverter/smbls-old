let main = document.querySelector('#main');
let nav = document.querySelector('nav');
let resultInput = document.querySelector('#result');

let data;
let url = 'data.json';
let lang = navigator.language;

fetch(url)
    .then(response => response.json())
    .then(commit => {
        data = commit;
    })
    .then(() => {
        generateContent();
});

// generates all the sections
function generateContent() {
    main.innerHTML = '';
    nav.innerHTML = '';
    for (let i of data) {

        // returnLangTitle()
        function returnLangTitle() {
            switch(lang) {
                case 'ru-RU':
                    return i.title_ru_RU || i.title
                default:
                    return i.title
            }
        }
        // header
        main.innerHTML += '<h3 id="group-' + i.title.replace(/\s+/g, '-') + '">' + returnLangTitle() + '</h3>';
        nav.innerHTML += '<a href="#group-' + i.title.replace(/\s+/g, '-') + '">' + returnLangTitle() + '</a>';

        // symbols
        let generatedList = '';

        for (let j of i.list) {
            if (typeof j == 'string') {
                generatedList += '<button class="symbol-box">' + j + '</button>';
            }
            else {
                generatedList += '<a class="symbol-box" data-tags"' + j[1] + '">' + j[0] + '</a>';
            }
        }

        main.innerHTML += '<section class="flex">' + generatedList + '</section>';
    }

    for (let k of document.querySelectorAll('.symbol-box')) {
        k.addEventListener('click', () => {
            resultInput.value = resultInput.value + k.innerText
        })
    }
}
