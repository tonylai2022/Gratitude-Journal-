function displayCategoryInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    db.collection("categories")
        .doc(ID)
        .get()
        .then(doc => {
            thisCategory = doc.data();
            categoryCode = thisCategory.code;
            categoryName = doc.data().name;

            // only populate title, and image
            document.getElementById("categoryName").innerHTML = categoryName;
            let imgEvent = document.querySelector(".category-img");
            imgEvent.src = "../images/" + categoryCode + ".jpg";
        });
}
displayCategoryInfo();

function saveCategoryDocumentIDAndRedirect() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    localStorage.setItem('categoryID', ID);
    window.location.href = "review.html";
}



function populateReviews() {
    let categoryCardTemplate = document.getElementById("reviewCardTemplate");
    let categoryCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href);
    let categoryID = params.searchParams.get("docID");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("reviews")
                .where("categoryDocID", "==", categoryID)
                .where("userID", "==", user.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var title = doc.data().title;
                        var description = doc.data().description;
                        var time = doc.data().timestamp.toDate();

                        let reviewCard = categoryCardTemplate.content.cloneNode(true);
                        reviewCard.querySelector(".title").innerHTML = title;
                        reviewCard.querySelector(".time").innerHTML = new Date(
                            time
                        ).toLocaleString();
                        reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;

                        categoryCardGroup.appendChild(reviewCard);
                    });
                })
                .catch((error) => {
                    console.log("Error getting reviews: ", error);
                });
        } else {
            console.log("No user is signed in");
            // Handle when no user is signed in
        }
    });
}

// Call the function to populate the user's reviews
populateReviews();
