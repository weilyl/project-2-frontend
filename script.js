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

const updateAnimalWithOutfit = async () => {
}
$("button#setfave").on('click', updateAnimalWithOutfit);

// EMPTY THE MENUS
// to be used when deleting or updating animals and/or outfits so that the options stay current 
// const emptyMenus = async () => {
//     //$selectedAnimal = $('#selectoutfit option:selected');
//         // exit function if selection is a prompt rather than an animal
//         if ($selectAnimal.val() == 0){
//             return false
//         } else {
//             $selectAnimal.empty()
//         }

//     //$selectedOutfit = $('#selectoutfit option:selected');
//         // exit function if selection is a prompt rather than an animal
//         if ($selectOutfit.val() == 0){
//             return false
//         } else {
//             $selectOutfit.empty()
//         }
// }

// Defining DELETE BUTTON function (capable of deleting both)
const deleteFromMenuAndAPI = async () => {
    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    // exit function if selection is a prompt rather than an animal
    if ($selectAnimal.val() === 0 || null || undefined) {
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
    if ($selectOutfit.val() === 0 || null || undefined) {
        return false} 
    else {
        await fetch(`${URL}/outfits/${$selectOutfit.val()}`, {
        method: "delete"
        })
    }
    $animalsContainer.empty();
    //emptyMenus();
    $selectAnimal.empty();
    $selectOutfit.empty();
    populateAnimalMenu();
    populateOutfitMenu();
    // TO DO: repopulate animalsContainer (first, make animal cards...)
}

// add new Animal (create)
const addNewAnimal = async () => {
    const $newAnimalName = $('#new-animal-name-input-field').val();
    const $newAnimalPhoto = $('#new-animal-photo-url-input-field').val();
    const $newAnimalPhotoDesc = $('#new-animal-photo-desc-input-field').val();
    const newAnimal = {
       "name": $newAnimalName,
       "photo": $newAnimalPhoto,
       "photo-alt-text": $newAnimalPhotoDesc
    }
    const response = await fetch(`${URL}/animals`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAnimal)
    })
    console.log(newAnimal);
    $selectAnimal.empty();
    populateAnimalMenu();
}

// add new outfit to the database (create)
const addNewOutfit = async () => {
    const $newOutfitName = $('#new-outfit-name-input-field').val();
    const $newOutfitPhoto = $('#new-outfit-photo-url-input-field').val();
    const $newOutfitPhotoDesc = $('#new-outfit-photo-desc-input-field').val();
    const newOutfit = {
       "name": $newOutfitName,
       "photo": $newOutfitPhoto,
       "photo-alt-text": $newOutfitPhotoDesc
    }
    const response = await fetch(`${URL}/outfits`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOutfit)
    })
    console.log(newOutfit);
    $selectOutfit.empty();
    populateOutfitMenu();
}

// add new Outfit (create)

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

$('#addAnimalButton').on('click', addNewAnimal);
$('#addOutfitButton').on('click', addNewOutfit);

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