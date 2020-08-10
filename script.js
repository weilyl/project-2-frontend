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
let $selectedAnimal = ""; 
let $selectedOutfit = ""; 
let animalId = '';
let outfitId = '';



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
const populateOutfitMenu = async () => {

    // fetch request
    const response = await fetch(`${URL}/outfits`);
    const data = await response.json()

    // create option tags for each JSON object retrieved from GET request
    data.forEach((outfit) => {
        const $option = $('<option>').attr('value', outfit._id).text(outfit.name);
        $selectOutfit.append($option);
    })
}

// Reference animals and outfits
    // One quirky side effect of PUT controller is that getAllAnimals returns all properties of referenced outfits, while getAllOutfits only returns an array of object ID's belonging to reference animals even though controllers are essentially the same
const updateAnimalWithOutfit = async () => {

    animalId = $('#selectanimal').val();
    outfitId = $('#selectoutfit').val();

    const dataToSend = [
        {animals: animalId},
        {outfits: outfitId}
    ];
    
    const response = await fetch(`${URL}/animals/match/${animalId}/${outfitId}`,
    {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(dataToSend)
        // post-post-MVP for the function updateAnimalWithOutfit:
        // Use array square bracket notation to target animal or outfit objects inside of the array dataToSend
    })
    const data = await response.json();

    const $div = $('<div>').addClass("display-card");
    $animalsContainer.prepend($div)
    const getUpdatedAnimal = async (animalId) => {
        const response = await fetch(`${URL}/animals/${animalId}`)
        const updatedAnimal = await response.json(); 

        const $h1 = $('<h1>').text(updatedAnimal.name);
        $div.append($h1);
        const $img = $('<img>').attr("src", updatedAnimal.photo).attr("alt", updatedAnimal["photo-alt-text"]).addClass('photo');
        $div.append($img);
    } 
    const getUpdatedOutfit = async (outfitId) => {
        const response = await fetch(`${URL}/outfits/${outfitId}`)
        const updatedOutfit = await response.json();

        const $h1 = $('<h1>').text(updatedOutfit.name);
        $div.append($h1);
        const $img = $('<img>').attr("src", updatedOutfit.photo).attr("alt", updatedOutfit["photo-alt-text"]).addClass('photo');
        $div.append($img);
        // post-MVP for the function getUpdatedOutfit:
        // Instead of using /outfits/:outfitId endpoint, use animals/:animalId endpoint, & use dot notation & array methods to obtain outfit id's & other properties
        // Alternatively, if the above idea does not work, use array methods to nest getUpdatedOutfit inside of getUpdateAnimal
    } 

    getUpdatedAnimal(animalId);
    getUpdatedOutfit(outfitId);
}

// Defining DELETE BUTTON function (capable of deleting both)
const deleteFromMenuAndAPI = async () => {
    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    if ($selectAnimal.val() !== 0 || null || undefined) {
        // delete at /:id
        await fetch(`${URL}/animals/${$selectAnimal.val()}`, {
            method: "delete"
        })
        $selectAnimal.empty()
    };
    populateAnimalMenu();

    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    // exit function if selection is a prompt rather than an animal
    if ($selectOutfit.val() !== 0 || null || undefined) {
        await fetch(`${URL}/outfits/${$selectOutfit.val()}`, {
        method: "delete"
        })
        $selectOutfit.empty()
    }
    // REFRESH page content
    populateOutfitMenu();

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
    $selectOutfit.empty();
    populateOutfitMenu();
}

// show all outfits
const showOutfits = async () => {
    $('#display-animals-here').empty();
    const response = await fetch(`${URL}/outfits`);
    const outfits = await response.json();
        outfits.forEach((outfit) => {
            const $eachOutfit = $('<div>').addClass("display-card");
            const $eachOutfitName = $('<h1>').text(outfit.name);
            $eachOutfit.append($eachOutfitName);
            const $eachOutfitPhoto = $('<img>').attr("src", outfit.photo).attr("alt", outfit["photo-alt-text"]).addClass("photo");
            $eachOutfit.append($eachOutfitPhoto)
            $('#display-animals-here').append($eachOutfit)
        })
}

const showAnimals = async () => {
    $('#display-animals-here').empty();
    const response = await fetch(`${URL}/animals`);
    const animals = await response.json();
        animals.forEach((animal) => {
            const $eachAnimal = $('<div>').addClass("display-card");
            const $eachAnimalName = $('<h1>').text(animal.name);
            $eachAnimal.append($eachAnimalName);
            const $eachAnimalPhoto = $('<img>').attr("src", animal.photo).attr("alt", animal["photo-alt-text"]).addClass("photo");
            $eachAnimal.append($eachAnimalPhoto)
            $('#display-animals-here').append($eachAnimal)
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
// Creates reference between animals, then generates a card to display beneath buttons
$("button#setfave").on('click', updateAnimalWithOutfit);

$('#addAnimalButton').on('click', addNewAnimal);
$('#addOutfitButton').on('click', addNewOutfit);

$('#display-all-animals').on('click', showAnimals);
$('#display-all-outfits').on('click', showOutfits);
