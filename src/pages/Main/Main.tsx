import React from 'react';
import Header from '../../layouts/Header/Header';
import img_src from '../../assets/images/i.webp';
import Converter from '../../layouts/Converter/Converter';

const Main: React.FC = () => {

    const header_props = {
        img_src
    };

    return(
        <div>
            <Header 
                {...header_props}
            />
            <Converter/>
        </div>
    );
};

export default Main;