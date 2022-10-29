 search("").then(() => {
        $(".loading-screen").fadeOut(500, () => {
            $("body").css("overflow", "visible")
        })
    })
async function search(m) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${m}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(400)
    return meals
}
async function getCategories(listBy) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    x = await x.json()
    return x;
}
async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}
async function filterByCategory(category) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(500)
}
async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}
async function getMeal(idMeal) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}
async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}
var nvWidth = 0,
isTrue = !0,
arr = [];
$(".strip-toggel-menu").click(function () {
isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".nav-tab-menu").width() - 10, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-tab-menu .item1").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1100), $(".nav-tab-menu .item2").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1200), $(".nav-tab-menu .item3").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1300), $(".nav-tab-menu .item4").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1400), $(".nav-tab-menu .item5").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1500), $(".nav-tab-menu .item6").animate({
    opacity: "1",
    paddingTop: "25px"
}, 1600), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".nav-tab-menu li").animate({
    opacity: "0",
    paddingTop: "500px"
}, 500), isTrue = !isTrue)
});
var isSearchTrue = !0;
$(".strip-search").click(function () {
isSearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
    top: "49%"
}, 1500, function () {
    $(".search-input").animate({
        top: "50%"
    }, 250)
}), isSearchTrue = !isSearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
    top: "300%"
}), isSearchTrue = !isSearchTrue)
});
var row = document.getElementById("rowData");
function displayCategories() {
    let cartona = ""
    for (var i = 0; i < arr.length; i++)
    cartona += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 " />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = cartona
}
function displayArea() {
    let cartona = ""
    for (var i = 0; i < arr.length; i++)
     cartona += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
            <i class="fa-solid fa-location-dot fa-3x text-white "></i>
                <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = cartona
}
function displayIngredients() {
    let cartona = ""
    for (var i = 0; i < arr.length; i++) 
    cartona += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
            <i class="fa-solid fa-bowel fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = cartona
}
function displayMeals(m) {
    let cartona = ""
    for (let i = 0; i < m.length; i++) {
        cartona += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${m[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${m[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${m[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = cartona
}
function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">
            ${meal[`strMeasure${i}`]}
             ${meal[`strIngredient${i}`]
            }</li>`
        }
    }
    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    } 

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>
					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
}
$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    if (listBy == "contact") {
        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow "placeholder="Enter Your Name">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" placeholder="Enter Email">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" placeholder="Enter phone">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control"  placeholder="Enter Age">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" type="password" placeholder="Enter Password">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control" type="password" placeholder="Enter RePassword">
					</div>
				</div>
			</div>
			<button type="submit" disabled  class="btn btn-outline-danger">Submit</button>
		</div>
	</section>`
        userName.addEventListener("focus", () => {
            nameToached = true
        })
        us
    }
    if (listBy == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>
			</div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }
    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);

    let x;

    if (listBy == "categories") {
        $(".loading-container").fadeIn(100)

        x = await getCategories(listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "a") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        displayArea()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "i") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        displayIngredients()
        $(".loading-container").fadeOut(500)
    }
})
