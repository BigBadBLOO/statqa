import React from 'react'
import {Button} from "@components/Base/Button";
import workWithServer from "@core/workWithServer";
import clsx from "clsx";

type typeValue = 'text' | 'number' | 'password'

type InputType = {
    icon?: string,
    type?: typeValue,
    value: string | number,
    name?: string
    className?: string,
    placeholder: string,
    label?: string,
    disabled?: boolean,
    setValue: (e: any, name?: string) => void,
}

export const Input: React.FC<InputType> = ({icon, type = 'text', placeholder, label, className, disabled, value, setValue, name}) => {

    const classes = [
        'rounded-md border px-2 py-1 m-2 place-content-center bg-white'
    ]

    classes.push(className)

    if (disabled) {
        classes.push(' cursor-not-allowed bg-opacity-50')
    }

    return (
        <>
            {
                label && <label>{label}</label>
            }
            <div className={classes.join(' ')}>
                {
                    icon
                        ? <i className="material-icons ml-auto float-left">{icon}</i>
                        : ''
                }
                <input
                    className="focus:outline-none w-full"
                    type={type}
                    name={name}
                    onChange={e => {
                        let tempValue: string | number = e.target.value
                        let name = e.target.name
                        if (type === 'number' && !validateNumber(tempValue)) tempValue = value
                        setValue(tempValue, name)
                    }}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        </>
    )
}


interface IImageUploader {
    image: any,
    setImage: (arg0: any) => void
    circle?: boolean
}

export const ImageUploader: React.FC<IImageUploader> = ({image, setImage, circle=true}) => {

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click()
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files[0]);
    };
    let url = ''
    if(image) {
        if(typeof image === 'object') url = URL.createObjectURL(image)
        else url = image
    }
    return (
        <div className="flex">
            {image
                ? (
                    <>
                        <img src={url} className={clsx("h-12 rounded", {"w-12 rounded-full" : circle})} alt="??????????????"/>
                        <span className="my-auto mx-2 text-gray-600 cursor-pointer" onClick={handleClick}>????????????????</span>
                        <span className="my-auto mx-2 text-gray-600 cursor-pointer" onClick={() => setImage(null)}>??????????????</span>
                    </>)
                : (
                    <>
                        <Button type="secondary" text="??????????????????" onClick={handleClick}/>
                        <span className="my-auto text-gray-500 text-sm ml-2">PNG, JPEG, 100x100 px</span>
                    </>
                )
            }
            <input type="file"
                   ref={hiddenFileInput}
                   onChange={handleChange}
                   style={{display: 'none'}}
                   accept="image/x-png,image/jpeg"
            />

        </div>
    );
}


function validateNumber(value: string) {
    return /^\d*$/.test(value)
}