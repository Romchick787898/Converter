import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    img_src: string;
}

const Header: React.FC<HeaderProps> = ({img_src}) => (
    <header>
        <div className={styles.img_money}>
            <img src={img_src}/>
        </div>
        <div className={styles.logo}>
            <a href="#converter">
                Конвертер валют
            </a>
        </div>
    </header>
)

export default Header;