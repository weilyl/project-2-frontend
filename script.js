// SET URL TO USE EITHER LOCAL OR DEPLOYED API
const deployedFrontEnd = 'https://acpc-api.herokuapp.com';
const URL = deployedFrontEnd ? deployedFrontEnd : 'https://localhost:3000';

//////////////////////
// GLOBAL VARIABLES
//////////////////////
const $selectAnimal = $('#selectanimal');
const $selectOutfit = $('#selectoutfit');
const $setFaveButton = $('#setfave');
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
        $selectAnimal.append($option);
        // console.log(animal._id);
    })
}

// Get all outfits from API and populate the drop-down select
const populateOutfitMenu = async () => {
    const response = await fetch(`${URL}/outfits`);
    const data = await response.json();
    // create option tags for each JSON object retrieved from GET request
    data.forEach((outfit) => {
        const $option = $('<option>').attr('value', outfit._id).text(outfit.name);
        $selectOutfit.append($('<option>').text("hello"));
        $selectOutfit.append($option);
    })
}

// Make a card from the selected animal and outfit
// but first, make sure the selectors are working
const makeCardFromMenus = async () => {

    $selectAnimal.val();
    $selectOutfit.val();
    //`${$('#selectanimal').val() }+${$("#selectoutfit").val()}`
    console.log(`${$('#selectanimal').val() }+${$("#selectoutfit").val()}`);
    
}
$("button#setfave").on('click', makeCardFromMenus);
//$setFaveButton.on('click', () => {console.log("BUT WHY")});
//$selectAnimal.on('change', () => {console.log('so this???')}) 

// DELETE animal from collection
// post-MVP add a warning modal or alert when clicked
const deleteAnimalFromAPI = async () => {

}


// OLD
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

// Get all animals & populate select menu on load
populateAnimalMenu();
// Get all outfits & populate select menu on load
populateOutfitMenu();



//////////////
// OLD TESTS
//////////////
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