// DOM
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submiteBtn = document.getElementById("submiteBtn");
var tableContent = document.getElementById("tableContent");
var alarmBox = document.getElementById("alarmBox");
var closeBtn = document.getElementById("close");

var myArray = [];
// Store The Data in LocalStorage
var storageArray = JSON.parse(localStorage.getItem("sites"));
// Validate the localStorage
if (storageArray !== null) {
  myArray = storageArray;
  displaySites();
}

// Display Content in the Website
function displaySites() {
  let container = "";
  for (let i = 0; i < myArray.length; i++) {
    container += `    <tr>
    <td class="fs-4">${i + 1}</td>
    <td class="fs-4">${myArray[i].site}</td>
    <td>
      <button onclick="visiteWebSite(${i})" class="btn btn-success fs-5 px-4"><i class="bi bi-eye-fill"></i>
        Visit  
      </button>
    </td>
    <td>
      <button onclick="deleteSite(${i})" class="btn btn-danger fs-5"><i class="bi bi-trash-fill"></i>
        Delete
      </button>
    </td>
  </tr>`;
  }
  tableContent.innerHTML = container;
}

// Clear The Form
function clearInputs() {
  siteName.value = null;
  siteURL.value = null;
}

// Add Site to the array
function submiteBookmark() {
  var isExist = false;
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].site === siteName.value) {
      isExist = true;
    }
  }

  if (myArray.length == 0) {
    addSite();
  } else if (isExist) {
    alert("already Exist in the bookmark");
  } else {
    addSite();
  }
}

function addSite() {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var siteInfo = {
      site: siteName.value,
      url: siteURL.value,
    };
    myArray.push(siteInfo);

    localStorage.setItem("sites", JSON.stringify(myArray));
    displaySites();
    clearInputs();
    console.log(myArray);
    console.log(storageArray);
    siteURL.classList.remove("is-valid");
    siteName.classList.remove("is-valid");
  } else {
    alarmBox.classList.remove("d-none");
  }
}
// Delete Site from the Array
function deleteSite(siteIndex) {
  myArray.splice(siteIndex, 1);
  displaySites();
  localStorage.setItem("sites", JSON.stringify(myArray));
  console.log(storageArray);
  console.log(myArray);
}
// Visite Site Function
function visiteWebSite(i) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(myArray[i].url)) {
    open(myArray[i].url);
  } else {
    open(`https://${myArray[i].url}`);
  }
}
// Add Event Listener
submiteBtn.addEventListener("click", submiteBookmark);

// close the alarm-box
closeBtn.addEventListener("click", () => {
  alarmBox.classList.add("d-none");
});

// validation
var siteNameRegex = /^\w{3,15}(\s+\w+)*$/;
var siteUrlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(\/\w+)*$/;

siteName.addEventListener("input", () => {
  if (siteNameRegex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
  }
});
siteURL.addEventListener("input", () => {
  if (siteUrlRegex.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
  } else {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
  }
});
