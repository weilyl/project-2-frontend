// const $h1 = $('<h1>');
const URL = 'https://acpc-api.herokuapp.com/'

fetch(URL)
.then(data => {
    let $hello = $('<h1>').text("Hello world");
    $('body').append($hello);
})