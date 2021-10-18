import React from 'react';
import Image from 'next/image';
import logoImg from './../../../public/codeleap-logo.png';
import { LogoImg } from '../Logo/styles';

export default function Logo() {

    return (
        <LogoImg className="logo">
            <Image src={logoImg} alt="codeleap logo" width={300} height={80} />
        </LogoImg>
    )
}
