import React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';
import './index.less';
import './theme.less';

import Intro from "./intro";
import Feature from "./feature";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function () {

  return (
    <BrowserOnly fallback={<div id="preloader"></div>}>
      {() => {
        // AOS JS
        AOS.init({
          offset: 100,
          duration: 700,
          easing: "ease-out-quad",
          once: !0
        });
        window.addEventListener('load', AOS.refresh);
        return <div className="home-wrap">
          <Intro />
          <br/>
          <Feature />
        </div>;
      }}
    </BrowserOnly>

  );
}
