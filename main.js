let main = document.querySelector('#main');
let nav = document.querySelector('nav');
let resultInput = document.querySelector('#result');

let data;
let url = 'data.json';
let lang = navigator.language;

// получает json со всеми данными
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
                generatedList += '<button class="symbol-box" data-tags="' + j + ' ">' + j + '</button>';
            }
            if (typeof j == 'object') {
                generatedList += '<a class="symbol-box" data-tags="' + j[0] + ' ' + j[1] + ' ">' + j[0] + '</a>';
            }
        }

        main.innerHTML += '<section class="flex">' + generatedList + '</section>';
    }

    for (let k of document.querySelectorAll('.symbol-box')) {
        k.addEventListener('click', () => {
            // добавляет в input в футере
            // resultInput.value = resultInput.value + k.innerText;
            navigator.clipboard.writeText(k.innerText)
        })
    }
}

/* SEARCH */
let searchInput = document.querySelector('#search');
searchInput.addEventListener('input', () => {
    for (let m of document.querySelectorAll('.symbol-box')) {
        m.style.display = '';
    }

    for (let m of document.querySelectorAll('.symbol-box')) {
        for (let p of searchInput.value.split(' ')) {
            if (m.dataset.tags.toLowerCase().search(p.toLowerCase()) != -1) {
                m.style.display = '';
            }
            else {
                m.style.display = 'none';
            }
        }
    }
})

// searchInput.addEventListener('input', () => {
    
//     for (let m of document.querySelectorAll('.symbol-box')) {
//         if (m.dataset.tags.toLowerCase().search(searchInput.value.toLowerCase()) != -1) {
//             m.style.display = '';
//         }
//         else {
//             m.style.display = 'none';
//         }
//     }
// })

/* THEMES */
/*let currentTheme;
if (localStorage.getItem('theme')) {
    currentTheme = localStorage.getItem('theme');
}
else {
    localStorage.setItem('theme', 'light');
}

let themesButton = document.querySelector('#settings-switchTheme');
themesButton.addEventListener('click', () => {

})*/