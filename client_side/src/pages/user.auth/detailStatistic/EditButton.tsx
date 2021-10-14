import React from "react";
import {useHistory} from "react-router-dom";

interface IEditButton {
  id: number
}
const EditButton: React.FC<IEditButton> = ({ id }) => {
  let history = useHistory();
  return <i
    className="material-icons rounded mr-2 p-1 cursor-pointer"
    style={{
      color: '#7E7E8C',
      background: '#E6E6EB'
    }}
    onClick={() => {
      history.push(`/editStatistic/${id}`)
    }}
  >edit</i>
}

export default EditButton