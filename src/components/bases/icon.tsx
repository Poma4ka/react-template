import React from 'react';
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {ICONS} from "../../assets/icons";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface Props extends Omit<FontAwesomeIconProps, "icon"> {
    icon: IconDefinition | keyof typeof ICONS
}

const Icon = ({icon,...props} : Props) => {
    return (
        <FontAwesomeIcon
            {...props}
            icon={typeof icon === "string" ? ICONS[icon] : icon}
        />
    );
};

export default Icon;