const $h1 = $('<h1>');
const URL = 'https://acpc-api.herokuapp.com/'

fetch(URL)
.then(response => {
    $hello = $h1.text("Hello world");
    $('body').append($hello);
})