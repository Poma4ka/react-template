import React, {HTMLAttributeAnchorTarget, ReactNode} from 'react';

interface Props {
    children? : ReactNode
    underline? : boolean
    href? : string
    target? : HTMLAttributeAnchorTarget
}

const Url = ({children,underline = true,href,target = '_blank',...props} : Props) => {
    return (
        <a
            {...props}
            style={{
                textDecoration: underline ? 'underline' : undefined
            }}
            href={href}
            target={target}
            rel={'noreferrer'}
        >
            {children}
        </a>
    );
};

export default Url;