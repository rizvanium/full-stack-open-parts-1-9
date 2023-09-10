import { useDispatch } from "react-redux"
import { updateFilterAction } from '../reducers/filterReducer';
const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(updateFilterAction(filterValue))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter