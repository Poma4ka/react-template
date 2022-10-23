import React, {ReactNode} from 'react';

interface Props {
    loading?: boolean
    children?: ReactNode
}


const Loading = ({loading = true,children} : Props) => {
    return (
        <>
            {
                loading
                    ?
                    <div className="loading">
                        <svg viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
                        </svg>
                    </div>
                    :
                    <>
                        {children}
                    </>
            }
        </>
    );
};

export default Loading;