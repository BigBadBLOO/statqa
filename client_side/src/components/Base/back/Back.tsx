import React from "react";
import {useHistory} from "react-router-dom";

const Back = () => {
  const history = useHistory()
  return <i
    className="material-icons mr-2 my-auto cursor-pointer"
    onClick={() => {
      history.goBack()
    }}
  >arrow_back</i>
}

export default Back