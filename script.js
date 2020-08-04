// SET URL TO USE EITHER LOCAL OR DEPLOYED API
const deployedFrontEnd = 'https://acpc-api.herokuapp.com';
const URL = deployedFrontEnd ? deployedFrontEnd : 'https://acpc-api.herokuapp.com/';

//////////////////////
// GLOBAL VARIABLES
//////////////////////
const $selectAnimal = $("#select-animal");
const $selectOutfit = $("#select-outfit");
const $setFaveButton = $("#set-fave");
// to add: Delete, Edit

//////////////////////
// FUNCTION DEFINITIONS
//////////////////////

// Get all animals from API and populate the drop-down select 
const populateAnimalMenu = async () => {
    const response = await fetch(`${URL}/animals`);
    const data = await response.json();

    data.forEach((animal) => {
        const $option = $('<option>').attr('value', animal._id).text(animal.name);
        $selectAnimal.append($option);
    })
}

// Get all outfits from API and populate the drop-down select
const populateOutfitMenu =async () => {
    const response = await fetch(`${URL}/outfits`);
    const data = await response.json();

    data.forEach((outfit) => {
        const $option = $('<option>').attr('value', outfit._id).text(outfit.name);
        $selectOutfit.append($option);
    })
}

const showAnimals = async (animals) => {
    animals.forEach(animal => {
        $li = $('<li>').html(`
        <h1>${animal.name}</h1>
        <img src="${animal.photo}" alt="${animal.photo-alt-text}">`);
        $('body').append($li);
    })
}

//////////////////////
// MAIN APPLICATION LOGIC
//////////////////////
// Get all animals
populateAnimalMenu();
// Get all outfits
populateOutfitMenu();

// fetch(URL)
// .then(data => {
//     getAnimals()
// })

// Hello world test
// fetch(URL)
// .then(data => {
//     let $hello = $('<h1>').text("Hello world");
//     $('body').append($hello);
// })