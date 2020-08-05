// SET URL TO USE EITHER LOCAL OR DEPLOYED API
const deployedFrontEnd = 'https://acpc-api.herokuapp.com';
const URL = deployedFrontEnd ? deployedFrontEnd : 'https://localhost:3000';

//////////////////////
// GLOBAL VARIABLES
//////////////////////
const $selectAnimal = $('#selectanimal');
const $selectOutfit = $('#selectoutfit');
const $setFaveButton = $('#setfave');
const $deleteButton = $('#deleteSelected');
const $updateAnimalButton = $('#updateAnimal');
const $updateOutfitButton = $('#updateOutfit');
const $animalsContainer = $("#display-animals-here");
let $selectedAnimal = ""; // Animal selected from menu for pairing up/updating/deleting
let $selectedOutfit = ""; // Outfit selected from menu for pairing up/updating/deleting


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
        $selectOutfit.append($option);
    })
}

// Make a card from the selected animal and outfit (update animal to include outfit)
// but first, make sure the selectors are working
const updateAnimalWithOutfit = async () => {
    //$selectedAnimal = $selectAnimal.val();
    //$selectedOutfit = $selectOutfit.val();
}
$("button#setfave").on('click', updateAnimalWithOutfit);

// EMPTY THE MENUS
// to be used when deleting or updating animals and/or outfits so that the options stay current 
const emptyMenus = async () => {
    //$selectedAnimal = $('#selectoutfit option:selected');
        // exit function if selection is a prompt rather than an animal
        if ($selectAnimal.val() == 0){
            return false
        } else {
            $selectAnimal.empty()
        }

    //$selectedOutfit = $('#selectoutfit option:selected');
        // exit function if selection is a prompt rather than an animal
        if ($selectOutfit.val() == 0){
            return false
        } else {
            $selectOutfit.empty()
        }
}

// Defining DELETE BUTTON function (capable of deleting both)
const deleteFromMenuAndAPI = async () => {
    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    // exit function if selection is a prompt rather than an animal
    if ($selectAnimal.val() === 0) {
        // return false
        console.log($selectAnimal.val());
    } else {
        // delete at /:id
        await fetch(`${URL}/animals/${$selectAnimal.val()}`, {
            method: "delete"
        })
    };

    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    // exit function if selection is a prompt rather than an animal
    if ($selectOutfit.val() === 0) {
        return false} 
    else {
        await fetch(`${URL}/outfits/${$selectOutfit.val()}`, {
        method: "delete"
        })
    }
    $animalsContainer.empty();
    emptyMenus();
    populateAnimalMenu();
    populateOutfitMenu();
    // TO DO: repopulate animalsContainer
}

// OLD - TO BE REUSED
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
// Delete Button Listener
$deleteButton.on('click', deleteFromMenuAndAPI);


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