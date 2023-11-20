var categoryID = localStorage.getItem('categoryID')


function displayCategoryName() {
    db.collection('categories').doc(categoryID).get().then((thisCategory) => {
        categoryName = thisCategory.data().name;
        document.getElementById("categoryName").innerHTML = categoryName;
    })
}

displayCategoryName()

function writeReview() {
    console.log("inside write review");
    let categoryTitle = document.getElementById("title").value;
    let categoryDescription = document.getElementById("description").value;


    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            categoryDocID: categoryID,
            userID: userID,
            title: categoryTitle,
            description: categoryDescription,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}
