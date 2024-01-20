let storeData = {
    data:[
        {
            id:"1",
            task:"reading",
            completed:true
        },
        {
            id:"2",
            task:"writing",
            completed:true
        },
        {
            id:"3",
            task:"running",
            completed:false
        }
    ]
}
const storeHandler = {
    get(target,property){
        return target[property]

    },
    set(target,property, value){
        console.log(target,property,value)
        target[property] = value
        if(property =="data"){
            window.dispatchEvent( new Event("dataChange"))
        }
        localStorage.setItem("storeData",JSON.stringify(storeData))
        return true
    }
}

let storeproxy = new Proxy(storeData,storeHandler)

function addTodo(newtodo){
     storeproxy.data = [...storeproxy.data, newtodo]
}

function deleteTodo(id){
    storeproxy.data = storeproxy.data.filter(item=>item.id !==id)
}
function togglecompleted(id,completed){
   storeproxy.data = storeproxy.data.map(item=>{
    if(item.id==id){
        return {...item,completed:completed}
    }else{
        return item
    }
   })
}
export {addTodo, deleteTodo,togglecompleted}
export default storeproxy