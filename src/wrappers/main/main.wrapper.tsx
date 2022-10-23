import React, {ReactNode} from 'react';
import classes from './index.module.scss';

interface Props{
    children: ReactNode
}

const MainWrapper = ({children} : Props) => {
    return (
        <main className={classes.wrapper}>
            {children}
        </main>
    );
};

export default MainWrapper;