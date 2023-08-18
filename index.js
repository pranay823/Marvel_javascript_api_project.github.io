


const inputText = document.querySelector(".input-text");
const submitBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".list-container");
const showContainer = document.querySelector(".display-container");

function removeElement(){
  list.innerHTML = "";
}
function displayWords(value){
 inputText.value = value;
 removeElement();
}



inputText.addEventListener("keyup",async ()=>{
  removeElement();
  if(inputText.length < 4){
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=17a754a064dc39966ff50d14a44f236a&hash=b1fa40ddd0293578a946b056d88cbd81&nameStartsWith=${inputText.value}`

  const response = await fetch(url);
  const jsonData = await response.json();
console.log(jsonData);
  jsonData.data["results"].forEach((result)=>{
    let name = result.name ;
    let div = document.createElement("div");
    div.style.cursor = "pointer"
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick","displayWords('"+ name + "')");
    let word ="<b>" + name.substr(0,inputText.value.length) + "</b>";
    word += name.substr(inputText.value.length);
    div.innerHTML = `<p class="item">${word}</p>`
    list.appendChild(div);

  })


})

















submitBtn.addEventListener("click",
 (getRsult = async () => {
 if(inputText.value.trim().length < 1){
    alert("Input cannot be blank");
 }
 showContainer.innerHTML ="";
 const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=17a754a064dc39966ff50d14a44f236a&hash=b1fa40ddd0293578a946b056d88cbd81&name=${inputText.value}`
 
 const response =  await fetch(url);
 const jsonData = await response.json();
 console.log("niche wala",jsonData)
 jsonData.data["results"].forEach((element) => {
   showContainer.innerHTML = `<div class="card-container">
   <div class="container-character-image">
   <img src="${
     element.thumbnail["path"] + "." + element.thumbnail["extension"]
   }"/></div>
   <div class="character-name">${element.name}</div>
   <div class="character-description">${element.description}</div>
   </div>`;
 });
})
);
window.onload = () => {
   getRsult();
};

