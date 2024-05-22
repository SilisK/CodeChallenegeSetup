//Global currentCatTax variable
let currentCatTax = 0;

//Global HTML selectors
const amountOwedDiv = document.getElementById("amountOwed");
const payButton = document.getElementsByClassName("payBtn")[0];
const imageContainer = document.getElementsByClassName("imageContainer")[0];

// TODO: calcButtonClick function
// Function should handle the following items:
// 1) Generate a random, whole number between 0 and 20.
// 2) If the random number is not 0, update the amountOwed div to display "You owe {random number} cat tax! Pay up!"
// 3) If the random number is not 0, update the pay button text to display "Pay Cat Tax"
// 4) If the random number is not 0, update the pay button so that it is no longer hidden
// 5) If the random number is 0, update the amountOwed div to display "You owe {random number} cat tax! You've escaped this time!"
// 6) If the random number is 0, update the pay button so that it is hidden.
// 7) Both the amountOwed and pay amount button should be updated every time the calculate cat tax button is clicked.

function calcButtonClick() {
  currentCatTax = Math.round(Math.random() * 20);

  if (currentCatTax > 0) {
    amountOwedDiv.innerText = `You owe ${currentCatTax} cat tax! Pay up!`;
    payButton.innerText = "Pay Cat Tax";
    payButton.classList.remove("hidden");
  } else {
    amountOwedDiv.innerText = `You owe ${currentCatTax} cat tax! You've escaped this time!`;
    if (!payButton.classList.contains("hidden"))
      payButton.classList.add("hidden");
  }
}

// TODO: payButton function
// Function should handle the following items:
// 1) Decrement the currentCatTax amount by 1
// 2) If the remaining cat tax is greater than zero, update the amountOwed div to display "You still owe {remaining amount} cat tax! Pay up!"
// 3) If the remaining cat tax is zero or fewer, update the amountOwed div to display "Your debts are paid..."
// 4) If the cat tax was payable (amount was greater than 0) when the button was clicked, make a call to the cat api to get a cat image (https://api.thecatapi.com/v1/images/search)
// 5) Once the cat image is retrieved, append the image to the image container
// 6) If the cat wax was not payable (amount was less than or equal to 0) when the button was clicked, replace the entire contents of the container with the gif found here (https://gfycat.com/snivelingbeautifuljoey-cat)

async function pay() {
  currentCatTax--;
  if (currentCatTax > 0) {
    await fetch("https://api.thecatapi.com/v1/images/search")
      .then((data) => data.json())
      .then((json) => {
        const imageUrl = json[0].url;
        const imgFrame = document.createElement("div");

        imgFrame.classList.add("pictureFrame");

        const img = document.createElement("img");
        img.src = imageUrl;

        imgFrame.append(img);

        imageContainer.append(imgFrame);
      });

    amountOwedDiv.innerText = `You still owe ${currentCatTax} cat tax! Pay up!`;
  } else if (currentCatTax <= 0) {
    amountOwedDiv.innerText = "Your debts are paid...";
  }
}
