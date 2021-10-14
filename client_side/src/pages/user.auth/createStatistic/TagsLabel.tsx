import React, {useState} from "react";
import Popover from "react-popover";

interface ITagsLabel {
  title: string
  help: any
}
const TagsLabel: React.FC<ITagsLabel> = ({title, help}) => {
  const [showPopover, setShowPopover] = useState(false)
  return (
    <span className="flex">
      <span className="md:ml-auto my-auto">{title}</span>
    <Popover
      className="z-20"
      body={(
        <div className="rounded p-4 w-auto md:w-80 bg-black bg-opacity-75 text-white z-20">
          {help}
        </div>
      )}
      isOpen={showPopover}
    >
      <span
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className="ml-1 cursor-pointer material-icons my-auto"
        style={{
          color: '#D4D4D9',
          fontSize: 18
        }}
      >help</span>
    </Popover>
    </span>
  )
}

export default TagsLabel