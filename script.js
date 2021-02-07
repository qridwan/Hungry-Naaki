const mealList = document.getElementById("mealList");
const searchBtn = document.getElementById("search-btn");

/////////////SEARCH BUTTON HANDLER//////
searchBtn.addEventListener("click", () => {
  const searchString = document.getElementById("searchBar").value;
  if (searchString.length === 1 && typeof(searchString)== String) {
    getData(searchString);
    document.getElementById("searchBar").value = "";
  } else {
    sorry();
    document.getElementById("searchBar").value = "";
  }
});

//////////MACHINE FOR GETTING SEARCHED MEAL INFO/////
const getData = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => getAllMeal(data.meals));
};
const getAllMeal = (mealName) => {
  const div = document.getElementById("mealList");
  mealName.forEach((obj) => {
    const newdiv = document.createElement("div");
    newdiv.className = "infoClass";
    const mealInfo = `
    <img onclick="getDetails(${obj.idMeal})" src="${obj.strMealThumb}"></img>
    <h3 onclick="getDetails(${obj.idMeal})"> ${obj.strMeal} </h3>`;
    newdiv.innerHTML = mealInfo;
    div.appendChild(newdiv);
  });
};

///////GIVE ERROR NOTIFICATION WHILE SOMEONE INPUT 2 OR MORE VALUE//////
const sorry = () => {
  const div = document.getElementById("mealList");
  const newdiv = document.createElement("div");
  newdiv.className = "sorryClass";
  const mealInfo = `
    <h1> You Should Search in only SINGLE Letter </h1>`;
  newdiv.innerHTML = mealInfo;
  div.appendChild(newdiv);
};

///////////MACHINE FOR GIVE MORE DETAILS OF SINGLE ITEM MEAL///////
const getDetails = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => setInfo(data.meals[0]));
  document.getElementById("details").style.display = "block";
};
const setInfo = (info) => {
  const information = document.getElementById("details");

  information.innerHTML = `<img src="${info.strMealThumb}"></img><br>
    <h2>${info.strMeal}</h2>
    <ul><h4>Ingredients</h4>
    <li>${info.strIngredient1} </li>
    <li>${info.strIngredient2} </li>
    <li>${info.strIngredient3} </li>
    <li>${info.strIngredient4} </li>
    <li>${info.strIngredient5} </li>
    </ul>
    <button onclick="location.reload()">CLEAR</button>`;
};

/////////thank you sir!/////////