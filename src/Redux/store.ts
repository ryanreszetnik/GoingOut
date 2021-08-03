import { createStore } from "redux"
import rootReducer from "./appReducer"

const store = createStore(rootReducer)
export default store
/*

Updating Data:
const dispatch = useDispatch();
dispatch({type:"", payload:{}});

Updating Mutliple fields at once so you only cause one re-render
import {batch} from 'react-redux'
batch(()=>{
    dispatch()
    dispatch()
})

Accessing Data:
const counter = useSelector(state=>state.counter)


*/
