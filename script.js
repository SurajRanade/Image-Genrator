const accessKey ="A_eP3oQHwAo7x-T4YIh33MWJpSIF3Ifta0VdMvL_eEw";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// we used async fuction as we wait for the response to be fetched
async function searchImages(){
   inputData = inputE1.value;

//    here we created a custom url which will get the input from the user and fetch the data according
//    to the input of the user 
 const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
   
//  we created a variable response that will fetch the data comming from url
 const response = await fetch(url);

//  we created a variable data that will convert the data into json format
   const data = await response.json();

//    to get the results from the data variable 
   const results  = data.results;


   if(page === 1){
    searchResults.innerHTML = "";
   }


//    now in the results variable we hava lot of data so for showing some data we use map method
   results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a") ;
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

   });

   page++;
   if(page > 1){
    showMore.style.display = "block";
   }
}

formE1.addEventListener("submit",(event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})

showMore.addEventListener("click",() => {
    searchImages();
})