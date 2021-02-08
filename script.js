const mealList = document.getElementById("mealList");
const searchBtn = document.getElementById("search-btn");

/////////////SEARCH BUTTON HANDLER//////
searchBtn.addEventListener("click", () => {
  const searchString = document.getElementById("searchBar").value;
  if (searchString.length != 1) {
    sorry(" Search With Single Letter");
    document.getElementById("searchBar").value = "";
  } 

  else {
    getData(searchString);
    document.getElementById("searchBar").value = "";
  }
});

//////////MACHINE FOR GETTING SEARCHED MEAL INFO/////
const getData = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     if (data.meals === null) {
        sorry('Not Found!')
      }
      else{
        getAllMeal(data.meals)};
    })
};

//showing all meals, searched
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
const sorry = (string) => {
  const div = document.getElementById("mealList");
  const newdiv = document.createElement("div");
  newdiv.className = "sorryClass";
  const mealInfo = `
    <h1> ${string} </h1>
    <button onclick="location.reload()">CLEAR</button>`;
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

///machine for meal details
const setInfo = (info) => {
  const information = document.getElementById("details");
  let ingArray = [];
  ////getting meal ingredients
  for (let i = 1; i < 15; i++) {
    ingArray.push(info[`strIngredient${i}`]);
  }
  const getUl = () => {
    const ul = document.getElementById("ingredients");
    for (let i = 0; i < ingArray.length; i++) {
      let li = document.createElement("li");
      li.className = "listClass";
      li.innerText = ingArray[i];
      ul.appendChild(li);
    }
    return ul.innerHTML;
  };

  //Showing meal detail info
  information.innerHTML = `<img src="${info.strMealThumb}"></img><br>
<h2>${info.strMeal}</h2>
<h4>Ingredients Used</h4>
${getUl()}
<button onclick="location.reload()">CLEAR</button>`;
};

/////////thank you sir!/////////
