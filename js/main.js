const bookmarkNameInput = document.getElementById("bookmarkName");
const bookmarkURLInput  = document.getElementById("bookmarkURL");
const addBtn            = document.getElementById("addBtn");
const tableBody         = document.getElementById("tableBody");
const errorMsg          = document.getElementById("errorMsg");

let bookmarks = [];

if (localStorage.getItem("myBookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("myBookmarks"));
  displayBookmarks();
}

addBtn.addEventListener("click", function() {
  let nameValue = bookmarkNameInput.value.trim();
  let urlValue  = bookmarkURLInput.value.trim();

  // Reset error message
  hideError();

  // Validate name
  const nameError = validateBookmarkName(nameValue);
  if (nameError) {
    showError(nameError);
    return;
  }

  // Validate URL
  if (!isValidURL(urlValue)) {
    showError("Please enter a valid URL (e.g., www.example.com or https://example.com)");
    return;
  }
  
  if (isBookmarkNameExist(nameValue)) {
    showError("This name has been entered previously. Please enter a different name.");
    return;
  }
  
  // Add https:// if not present
  if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
    urlValue = 'https://' + urlValue;
  }
  
  let newBookmark = {
    name: nameValue,
    url : urlValue
  };
  bookmarks.push(newBookmark);
  
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  
  displayBookmarks();
  
  bookmarkNameInput.value = "";
  bookmarkURLInput.value  = "";
  hideError();
});

function displayBookmarks() {
  tableBody.innerHTML = "";
  
  bookmarks.forEach((bookmark, index) => {
    let row = document.createElement("tr");
    
    let indexTd = document.createElement("td");
    indexTd.className = "text-center";
    indexTd.textContent = index + 1;
    
    let nameTd = document.createElement("td");
    nameTd.className = "text-center";
    nameTd.textContent = bookmark.name;
    
    let visitTd = document.createElement("td");
    let visitBtn = document.createElement("button");
    visitBtn.className = "btn btn-after";
    visitBtn.style.backgroundColor = "#9eb23b";
    visitBtn.style.color = "#fff";
    visitBtn.style.width = "100px";
    visitBtn.style.borderRadius = "10px";
    visitTd.className = "text-center";
    visitBtn.textContent = "Visit";

    visitBtn.addEventListener("click", function() {
      window.open(bookmark.url, "_blank");
    });
    visitTd.appendChild(visitBtn);
    
    let deleteTd = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.style.width = "100px";
    deleteBtn.style.borderRadius = "10px";

    deleteBtn.textContent = "Delete";
    deleteTd.className = "text-center";

    deleteBtn.addEventListener("click", function() {
      deleteBookmark(index);
    });
    deleteTd.appendChild(deleteBtn);
    
    row.appendChild(indexTd);
    row.appendChild(nameTd);
    row.appendChild(visitTd);
    row.appendChild(deleteTd);
    
    tableBody.appendChild(row);
  });
}

function deleteBookmark(bookmarkIndex) {
  bookmarks.splice(bookmarkIndex, 1);
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

function isValidURL(url) {
  try {
    // Add https:// if no protocol is specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const urlObj = new URL(url);
    // Check if the URL has a valid hostname (contains at least one dot)
    if (!urlObj.hostname.includes('.')) {
      return false;
    }
    // Check if the protocol is valid
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    // Check if the hostname is not empty
    if (!urlObj.hostname) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

function validateBookmarkName(name) {
  if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }
  if (name.length > 50) {
    return "Name must be less than 50 characters";
  }
  if (!/^[a-zA-Z0-9\s-_]+$/.test(name)) {
    return "Name can only contain letters, numbers, spaces, hyphens and underscores";
  }
  return null;
}

function isBookmarkNameExist(name) {
  return bookmarks.some(b => b.name.toLowerCase() === name.toLowerCase());
}

function showError(msg) {
  const errorSpan = errorMsg.querySelector('span');
  errorSpan.textContent = msg;
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.style.display = "none";
}
