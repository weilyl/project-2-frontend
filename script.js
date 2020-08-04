// SET URL TO USE EITHER LOCAL OR DEPLOYED API
const deployedFrontEnd = 'https://acpc-api.herokuapp.com';
const URL = deployedFrontEnd ? deployedFrontEnd : 'https://localhost:3000';

//////////////////////
// GLOBAL VARIABLES
//////////////////////
//const $selectAnimal = $('#selectanimal');
//const $selectOutfit = $('#selectoutfit');
//const $setFaveButton = $('#setfave');
// to add: Delete, Edit

//////////////////////
// FUNCTION DEFINITIONS
//////////////////////

// Get all animals from API and populate the drop-down select 
const populateAnimalMenu = async () => {
    const response = await fetch(`${URL}/animals`);
    const data = await response.json();
    // console.log(data);

    data.forEach((animal) => {
        const $option = $('<option>').attr('value', animal._id).text(animal.name);
        $('#selectanimal').append($option);
        // console.log(animal._id);
    })
}

// Get all outfits from API and populate the drop-down select
const populateOutfitMenu = async () => {
    const response = await fetch(`${URL}/outfits`);
    const data = await response.json();

    data.forEach((outfit) => {
        const $option = $('<option>').attr('value', outfit._id).text(outfit.name);
        $('#selectoutfit').append($('<option>').text("hello"));
        $('#selectoutfit').append($option);
    })
}

// Make a card from the selected animal and outfit
const makeCardFromMenus = async () => {
    //const $selectedAnimal = $("#selectanimal").val();
    //const $selectedOutfit = $("#selectoutfit").val();
    `${$('#selectanimal').val() }+${$("#selectoutfit").val()}`
    //console.log(`${$('#selectanimal').val() }+${$("#selectoutfit").val()}`);
    console.log($("#selectanimal").val())
}
$("#setfave").on('click', makeCardFromMenus);

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