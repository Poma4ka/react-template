import React, {useEffect, useRef, useState} from 'react';
import classes from "./index.module.scss"
import {multiClass} from "../../../helpers/multi-class";

interface OptionInterface {
    value : string|number
    label : string
}

interface GroupOptionsInterface {
    label: string
    options: OptionInterface[]
}

const isGroup = (options: any) : options is GroupOptionsInterface[] => !!options[0]?.["options"]


export interface SelectProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    options : OptionInterface[] | GroupOptionsInterface[]
    placeholder?: string
    error?: string|boolean
    disabled?: boolean
}

const Select = ({options,placeholder,error,disabled,className,value,onChange,onInput,...props} : SelectProps) => {
    const inputRef = useRef<HTMLInputElement>()
    const [opened,setOpened] = useState(false)
    const [name,setName] = useState<string>()

    const getName = (): string|null => {
        if (value) {
            if (isGroup(options)) {
                const group = options.find(({options}) => options.find(({value: v}) => v == value))
                return group?.label + " - " + group?.options.find(({value: v}) => v == value)?.label
            } else {
                return options.find(({value:v}) => v == value)?.label
            }
        }
    }

    const onClick = (value) => {
        inputRef.current.value = value
        inputRef.current.dispatchEvent(new Event("input",{
            bubbles: true
        }))
        setOpened(false)
    }

    useEffect(() => {
        setName(getName())
    },[value,options])

    return (
        <>
            <input
                ref={inputRef}
                {...props}
                value={value}
                onInput={onChange || onInput}
                className={classes.realInput}
                type="hidden"
            />
            <div
                className={multiClass(classes.wrapper,className)}
                tabIndex={0}
                onBlur={(e: any) => setOpened(false)}
                data-disabled={disabled}
            >
                <div
                    className={classes.input}
                    onClick={() => !disabled && setOpened(!opened)}
                    data-error={error}
                >
                    <div className={classes.value}>
                        {
                            name || <span className={classes.placeholder}>{placeholder}</span>
                        }&nbsp;
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.765 10.741" className={classes.check}>
                        <path d="M7.38,21.01a1.249,1.249,0,0,0,1.77,0l8.31-8.31a1,1,0,0,0,0-1.41L9.15,2.98A1.252,1.252,0,0,0,7.38,4.75L14.62,12,7.37,19.25A1.246,1.246,0,0,0,7.38,21.01Z" transform="translate(21.377 -7.011) rotate(90)" fill="currentColor" stroke="none"/>
                    </svg>
                </div>
                {
                    opened &&
                    <div className={classes.menu}>
                        {
                            isGroup(options)
                                ?
                                options.map((group,key) =>
                                    <Group
                                        group={group}
                                        key={key}
                                        value={value}
                                        onClick={onClick}
                                    />
                                )
                                :
                                options.map((option,key) =>
                                    <Option
                                        option={option}
                                        key={key}
                                        selected={value === option.value}
                                        onClick={onClick}
                                    />
                                )
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default Select;

interface GroupProps {
    group: GroupOptionsInterface
    value: SelectProps["value"]
    onClick: OptionProps["onClick"]
}

const Group = ({group,value,onClick} : GroupProps) => {

    return (
        <div className={classes.group}>
            <div className={classes.name}>
                {group.label}
            </div>
            {
                group.options.map((option,key) =>
                    <Option
                        key={key}
                        option={option}
                        selected={option.value === value}
                        onClick={onClick}
                    />
                )
            }
        </div>
    );
}


interface OptionProps {
    option: OptionInterface
    selected: boolean
    onClick: any
}

const Option = ({option,selected,onClick}: OptionProps) => {
    return (
        <div
            className={classes.option}
            data-active={selected}
            onClick={() => onClick(option.value)}
        >
            {option.label}
        </div>
    );
};