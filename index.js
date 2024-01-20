import storeData from "./store.js";
import { addTodo, deleteTodo,togglecompleted } from "./store.js";

let task = document.querySelector(".task")
let form = document.querySelector('#form')


const renderList = ()=>{
  let card = storeData.data.map(item=>`<li class="row" data-id=${item.id}>
  <p class="taskhead ${item.completed && "line" }">${item.task}</p>
  <div>
      <span><input class="checkbox" type="checkbox" ${item.completed && "checked"}/></span>
      <span><button class="btn">delete</button></span>
  </div>
</li>`).join("")
   task.innerHTML = card
}




form.addEventListener("submit", (e)=>{
   e.preventDefault()
   let input = document.querySelector("#text").value
   const newtodo ={
    id:crypto.randomUUID(),
    task:input,
    completed:false
   }
   addTodo(newtodo)
})
task.addEventListener("click", (e)=>{
  const target = e.target
  if(target.classList.contains("btn")){
    let li =  target.closest(".row")
     deleteTodo(li.dataset.id)
  }
})
task.addEventListener("change",(e)=>{
  const target = e.target
   if(target.classList.contains("checkbox")){
    let li =  target.closest(".row")
    let completed = target.checked
       togglecompleted(li.dataset.id,completed)
   }
})


window.addEventListener("dataChange", ()=>{
  renderList()
})


const store = JSON.parse(localStorage.getItem("storeData"))

if(store?.data.length>0){
  storeData.data = store.data
}else{
  localStorage.setItem("storeData",JSON.stringify(storeData))
  renderList()
}
