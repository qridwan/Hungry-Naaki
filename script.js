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
const getData = async(name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
  const response = await fetch(url)
  const data  = await response.json()
     if (data.meals === null) {
        sorry('Not Found!')
      }
      else{
        getAllMeal(data.meals)
      };
    }


//showing all meals, searched
const getAllMeal = (mealName) => {
  const div = document.getElementById("mealList");
div.innerHTML = ''
  mealName.forEach((obj) => {
    const newdiv = document.createElement("div");
    newdiv.className = "infoClass";
    let mealInfo = `
    <img onclick="getDetails(${obj.idMeal})" src="${obj.strMealThumb}"></img>
    <h3 onclick="getDetails(${obj.idMeal})"> ${obj.strMeal} </h3>`;
    newdiv.innerHTML = mealInfo;
    div.appendChild(newdiv);
  });
};


///////////MACHINE FOR GIVE MORE DETAILS OF SINGLE ITEM MEAL///////
const getDetails = async(mealId) => {
 const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  const res = await fetch(url)  
  const data =await  res.json();
  setInfo(data.meals[0]);
  
};

///machine for meal details
const setInfo = (info) => {
  const information = document.getElementById("details");
  information.style.display = 'block'
 
  // //forloop for getting ingredients array
  // let ingArray = [];
  // for (let i = 1; i < 18; i++) {
  //   ingArray.push(info[`strIngredient${i}`]);
  // }

  //Showing meal detail info
  information.innerHTML = `
  <img src="${info.strMealThumb}"></img><br>
<h2>${info.strMeal}</h2>
<ul><h4>Ingredients</h4>
<li>${info.strIngredient1} </li>
<li>${info.strIngredient2} </li>
<li>${info.strIngredient3} </li>
<li>${info.strIngredient4} </li>
<li>${info.strIngredient5} </li>
<li>${info.strIngredient6} </li>
<li>${info.strIngredient7} </li>
<li>${info.strIngredient8} </li>
<li>${info.strIngredient9} </li>
<li>${info.strIngredient10} </li>
<li>${info.strIngredient11} </li>
<li>${info.strIngredient12} </li>
<li>${info.strIngredient13} </li>
<li>${info.strIngredient14} </li>
<li>${info.strIngredient15} </li>
</ul>
<button onclick="displayNone()">CLEAR</button>`;
};

const displayNone = ()=> {
  document.getElementById('details').style.display = 'none';
}

///getiing meal ingredients from ingArray 
// const getUl = (array) => {
//   const ul = document.getElementById("ingredients");
//   for (let i = 0; i < array.length; i++) {
//     let li = document.createElement("li");
//     li.className = "listClass";
//     li.innerText = array[i];
//     ul.appendChild(li); 
//   }
// return ul.innerHTML
// //  return console.log(ul)
// };


///////GIVE ERROR NOTIFICATION WHILE SOMEONE INPUT 2 OR MORE VALUE//////
const sorry = (string) => {
  const div = document.getElementById("mealList");
  div.innerHTML = ''
  const newdiv = document.createElement("div");
  newdiv.className = "sorryClass";
  const mealInfo = `
    <h1> ${string} </h1>
    <button onclick="location.reload()">CLEAR</button>`;
  newdiv.innerHTML = mealInfo;
  div.appendChild(newdiv);
};
/////////thank you sir!/////////
