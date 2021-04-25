let main = document.querySelector('#main');
let resultInput = document.querySelector('#result');

let data;
let url = 'data.json';

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
    for (let i of data) {
        main.innerHTML += '<h3>' + i.title + '</h3>';

        let generatedList = '';

        for (let j of i.list) {
            if (typeof j == 'string') {
                generatedList += '<a class="symbol-box">' + j + '</a>';
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
