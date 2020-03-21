import React, { Fragment } from 'react'

import Header from "../layouts/Header";

const MainLayout = () => {
    return (
        <Fragment>
            <Header title="Blog" sections={categories} />
        </Fragment>
            
        
    )
}

export default MainLayout
