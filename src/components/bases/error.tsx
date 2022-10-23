import React, {ReactNode} from 'react';
import H4 from "./h4";

interface Props {
    error?: ReactNode
    children?: ReactNode
    condition?: boolean
}

const Error = ({error,children,condition = true} : Props) => {
    return (
        <>
            {
                condition
                    ?
                    <H4 align={"center"}>{error}</H4>
                    :
                    <>
                        {children}
                    </>
            }
        </>
    );
};

export default Error;