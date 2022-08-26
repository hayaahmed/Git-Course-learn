let ourWorkSlis=document.querySelectorAll(".ourwork .ourworkUL li");
let divofimg=Array.from(document.querySelectorAll(".ourwork .row .all"));
ourWorkSlis.forEach((e)=>{
e.addEventListener("click",removeActive);
e.addEventListener("click",manageDivOf_Imgs);

});
//remove active class from the current 
function removeActive(){
    ourWorkSlis.forEach((e) => {
        e.classList.remove("active");
        e.classList.remove("rounded-pill");
        this.classList.add("active");
         this.classList.add("rounded-pill");
    });
}
//manage div of imgs
function manageDivOf_Imgs(){
    divofimg.forEach((d) => {
        d.style.display="none";
    });
   document.querySelectorAll(this.dataset.cat).forEach((i) => {
       i.style.display="flex";
   });
}
////up span
let spann=document.querySelector(".up");
window.onscroll=function(){
    if(this.scrollY>1000){
        spann.classList.add("show");
    }
    else{
        spann.classList.remove("show");
    }
};
spann.onclick=function(){
    window.scrollTo({
        top:0,behavior: "smooth",
    });
}
///////////taps
let tapslis=Array.from( document.querySelectorAll(".taps li"));
let contents=Array.from(document.querySelectorAll(".content > div"));
tapslis.forEach((e) =>{
    e.addEventListener("click",removeactiveFromtaps);
    e.addEventListener("click",manageContent);

})

function removeactiveFromtaps (){
    tapslis.forEach((e) => {
        e.classList.remove("active");
        this.classList.add("active");
    });
}
function manageContent(){
    contents.forEach((o) =>{
        o.style.display="none";
    });
    document.querySelector(this.dataset.tap).style.display="block"; 
}
////////////to do
let input = document.querySelector(".input");
let addtaskbtn = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let tasksnn = [];

//check if is tasks in local storage
if(localStorage.getItem("taskss")){
    tasksnn=JSON.parse(window.localStorage.getItem("taskss"));
}
getdatafromLS();

addtaskbtn.onclick=function(){
    if(input.value !=="")
    {
        add_TasktoArray(input.value);
        input.value = "";
    }
}
//if i press on delete what to do or press on the task it self what to do
tasksDiv.addEventListener("click",(e) => {
if(e.target.classList.contains("del")){
    deleteTaskWithID(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
}
if(e.target.classList.contains("task")){
    toggleStatusWithID(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
}
});

function add_TasktoArray(inputtext){
    const task={
        id:Date.now(),
        title:inputtext,
        completed:false,
    };

    tasksnn.push(task);
    PutDataToThe1_page_from_array(tasksnn);
    addElementToLS(tasksnn);

}

function PutDataToThe1_page_from_array(tasksnn){
tasksDiv.innerHTML= "" ;
tasksnn.forEach((task)=>{
    let div=document.createElement("div");
    div.className="task";
    if(div.completed){
        div.className="task done";
    }  
    div.setAttribute("data-id",task.id);
    div.appendChild(document.createTextNode(task.title));
    //create delete btn
    let delet_btn=document.createElement("span");
    delet_btn.className="del";
    delet_btn.appendChild(document.createTextNode("delete"));
    div.appendChild(delet_btn);
    tasksDiv.appendChild(div);

});

}

function addElementToLS(tasksnn){
    window.localStorage.setItem("taskss",JSON.stringify(tasksnn));
}
function getdatafromLS(){
    let data=window.localStorage.getItem("taskss");
    if(data)
    {
    let tasks = JSON.parse(data);
    PutDataToThe1_page_from_array(tasks);
    }
}
function deleteTaskWithID(taskId){
    tasksnn = tasksnn.filter((e) => e.id != taskId);
    addElementToLS(tasksnn);

}
function toggleStatusWithID(taskId){
for (let i = 0; i < tasksnn.length; i++) {
    if(tasksnn[i].id ==taskId){
        tasksnn[i].completed == false ?( tasksnn[i].completed = true): ( tasksnn[i].completed = false);
    }
}
addElementToLS(tasksnn);
}


//generate serial letters
let serial=document.querySelector(".serial");
let generate = document.querySelector(".generate");

generate.onclick=function(){
    let hex = "asdknjbhbd&^%$#@JHH123456";
    let hexArray=Array.from(hex);
    let counta=10;
    let finalarr="";
for (let i = 0; i < counta; i++) {
    finalarr += hexArray[Math.floor(Math.random() * hexArray.length ) ];
   
}
console.log(finalarr);
serial.textContent= finalarr;
}
//close navv from x or press esc
let toggle_nav=document.querySelector(".navbar-toggler");
let navbar=document.querySelector(".navbar-collapse")
let close=document.querySelector(".close");
toggle_nav.onclick=function(){
    close.classList.toggle("addflex");

}
window.onkeyup = function (e) {
    if (e.key === "Escape") {
      navbar.classList.remove("show");
      close.classList.toggle("addflex");
    }
  }

//the new update count the letters and dont write again if reach to the end
let counttheletters=document.querySelector(".count");
let theprogress=document.querySelector(".progresss");
let supinput=document.querySelector(".in");
let maxlen=supinput.getAttribute("maxlength");
counttheletters.innerHTML=maxlen;
supinput.oninput=function(){
    counttheletters.innerHTML=maxlen-this.value.length;
    counttheletters.innerHTML==0 ?counttheletters.classList.add("zero"):counttheletters.classList.remove("zero");
    
    theprogress.style.width=`${(this.value.length * 100)/maxlen}%`;

}
//<!-- rest-time -->
let days=document.querySelector(".days");
let hours=document.querySelector(".hours");
let mins=document.querySelector(".mins");
let secounds=document.querySelector(".secs");
let counterDate=new Date("may 30,2022 23:59:59").getTime();
let counter=setInterval(() => {
let daysnow=new Date().getTime();
let daysdeff=counterDate-daysnow;
let thedays=Math.floor( ( daysdeff / (1000*60*60*24)));
days.innerHTML=thedays < 10 ?`0${thedays}`:thedays;

let thehours=Math.floor( ( daysdeff % (1000*60*60*24))/(1000*60*60));
hours.innerHTML=thehours < 10 ? `0${thehours}`:thehours;

let themins=Math.floor( (daysdeff % (1000*60*60))/(1000*60));
mins.innerHTML=themins < 10 ? `0${themins}`:themins;

let thesecs=Math.floor( ( daysdeff % (1000*60))/(1000));
secounds.innerHTML= thesecs < 10 ? `0${thesecs}`:thesecs;
if(daysdeff==0){
    clearInterval();
}
},1000);
//get to sections from nav bar
let navsections=document.querySelectorAll(".navbar-nav li");
getsection(navsections);
function getsection(x){
    navsections.forEach(e=>{
        e.addEventListener("click",(y)=>{
            y.preventDefault();
            document.querySelector(y.target.dataset.section).scrollIntoView({ behavior:'smooth' });
        })
    })
}

