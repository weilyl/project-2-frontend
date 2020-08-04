// const $h1 = $('<h1>');
const deployedFrontEnd = 'https://acpc-api.herokuapp.com';
const URL = deployedFrontEnd ? deployedFrontEnd : 'https://acpc-api.herokuapp.com/';

const getAnimals = async () => {
    const response = await fetch(`${URL}/animals`);
    const data = await response.json();
    showAnimals(animals)
}

const showAnimals = async (animals) => {
    animals.forEach(animal => {
        $li = $('<li>').html(`
        <h1>${animal.name}</h1>
        <img src="${animal.photo}" alt="${animal.photo-alt-text}">`);
        $('body').append($li);
    })
}

fetch(URL)
.then(data => {
    getAnimals()
})

// Hello world test
// fetch(URL)
// .then(data => {
//     let $hello = $('<h1>').text("Hello world");
//     $('body').append($hello);
// })