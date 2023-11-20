function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

function writeCategories() {
    //define a variable for the collection you want to create in Firestore to populate data
    var categoriesRef = db.collection("categories");

    categoriesRef.add({
        code: "School",
        name: "School"
    });
    categoriesRef.add({
        code: "Work",
        name: "Work"

    });
    categoriesRef.add({
        code: "Family",
        name: "Family"
    });
    categoriesRef.add({
        code: "Friend",
        name: "Friend"
    });
    categoriesRef.add({
        code: "Others",
        name: "Others"
    });
}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("CardTemplate"); // Retrieve the HTML element with the ID "CardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "categories"
        .then(allCategories => {
            allCategories.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var categoryCode = doc.data().code;    //get unique ID to each category to be used for fetching right image
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-image').src = `./images/${categoryCode}.jpg`;
                newcard.querySelector('a').href = "eachCategory.html?docID=" + docID;

                //attach to database, Example: "categories-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

            })
        })
}

displayCardsDynamically("categories"); 