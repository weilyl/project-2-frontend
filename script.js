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
///// functions
// populateAnimalMenu
// populateOutfitMenu
// updateAnimalWithOutfit ---------------NEEDS WORK
// emptyMenus >> emptyAnimalMenu && emptyOutfitMenu MAY BE OBSOLETE
// deleteFromMenuAndAPI ------------ refreshes menu by calling on populateAnimalMenu and populateOutfitMenu and emptying both menus -
// addNewAnimal ----------NEED TO EMPTY MENU & REPOPULATE (maybe container too??)
// addNewOutfit ----------NEED TO EMPTY MENU & REPOPULATE (maybe container too??)
// showAnimals & showOutfits ---- empties div at first, then displays all animals/outfits at once *MEDIA QUERY*



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
    const data = await response.json();

    // create option tags for each JSON object retrieved from GET request
    data.forEach((outfit) => {
        const $option = $('<option>').attr('value', outfit._id).text(outfit.name);
        $selectOutfit.append($option);
    })
}

// Reference animals and outfits

const updateAnimalWithOutfit = async () => {
    const animalId = $('#selectanimal').val();
    const outfitId = $('#selectoutfit').val();
    console.log(animalId)
    console.log(outfitId)
    // const updatedAnimal = {
    //     outfits: outfitId
    // };
    // const updatedOutfit = {
    //     animals: animalId
    // };
    const matching = await fetch(`${URL}/animals/match/${animalId}/${outfitId}`,
    {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify()//,
        //body: JSON.stringify(updatedOutfit)
    })
    console.log(matching);
    const data = matching.json;
    console.log(matching.name)
}

// EMPTY THE MENUS - OBSOLETE????????
// to be used when deleting or updating animals and/or outfits so that the options stay current 
const emptyMenus = async () => {

    // exit function if selection is a prompt rather than an animal
    const emptyAnimalMenu = async () => {
        $selectAnimal.each(function(index,thing){
            console.log(this.value)
            if (this.value !== 0 || null || undefined){
            this.remove()
            }
        })
    }
    // emptyAnimalMenu();

    // exit function if selection is a prompt rather than an animal
    const emptyOutfitMenu = async () => {
        $selectOutfit.each(function(index,thing){
            console.log(this.disabled)
            if (this.disabled !== 0 || null || undefined) {
            this.remove()
            }
        })
    }
    // emptyOutfitMenu();
}

// Defining DELETE BUTTON function (capable of deleting both)
const deleteFromMenuAndAPI = async () => {
    // DELETE animal from collection
    // post-MVP add a warning modal or alert when clicked
    // exit function if selection is a prompt rather than an animal
    if ($selectAnimal.val() !== 0 || null || undefined) {
        // delete at /:id
        await fetch(`${URL}/animals/${$selectAnimal.val()}`, {
            method: "delete"
        })
        $selectAnimal.empty()
    };

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

    // $animalsContainer.empty();
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
    // emptyAnimalMenu();
    // $selectAnimal.empty();
    // populateAnimalMenu();
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
    // emptyOutfitMenu();
    // $selectOutfit.empty();
    // populateOutfitMenu();
}

// show all outfits
const showOutfits = async () => {
    $('#display-animals-here').empty();
    const response = await fetch(`${URL}/outfits`);
    const outfits = await response.json();
        outfits.forEach((outfit) => {
            console.log(outfit.photo);
            const $eachOutfit = $('<li>');
            const $eachOutfitName = $('<h1>').text(outfit.name);
            $eachOutfit.append($eachOutfitName);
            const $eachOutfitPhoto = $('<img>').attr("src", outfit.photo).attr("alt", outfit["photo-alt-text"]);
            $eachOutfit.append($eachOutfitPhoto)
            $('#display-animals-here').append($eachOutfit)
        })
}

const showAnimals = async () => {
    $('#display-animals-here').empty();
    const response = await fetch(`${URL}/animals`);
    const animals = await response.json();
        animals.forEach((animal) => {
            console.log(animal.photo);
            const $eachAnimal = $('<li>');
            const $eachAnimalName = $('<h1>').text(animal.name);
            $eachAnimal.append($eachAnimalName);
            const $eachAnimalPhoto = $('<img>').attr("src", animal.photo).attr("alt", animal["photo-alt-text"]);
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

//////////////
// OLD TESTS
//////////////

// Hello world test
// fetch(URL)
// .then(data => {
//     let $hello = $('<h1>').text("Hello world");
//     $('body').append($hello);
// })