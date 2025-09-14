
const reducerAction = (state ,action)=>{
  switch(action.type){
    case "connected": 
    return {
      ...state,
      user:action.payload.user,
      connection:true
    }
    case "disconnect":
      return{
        ...state,
        user:null,
        connection:false
      }
  }
}


export default reducerAction