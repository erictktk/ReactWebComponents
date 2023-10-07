import React from 'react';
import { Parallax, ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import  bg  from '../assets/NJ-JV-Agave-Fields_-2.jpg';

/*
<ParallaxBannerLayer speed={-50} style={{marginTop: "1000px"}}>
<h1 style={{color: "black"}}>My Headline</h1>
</ParallaxBannerLayer>*/

const ParallaxBackground = () => {
    console.log(bg);
  return (
    <div style={{minHeight: "2000px"}}>
    
      <h1>
        HI!
      </h1>
      <h1>
        HI!
      </h1>
      <h1>
        HI!
      </h1>
      <h1>
        HI!
      </h1>
      <ParallaxProvider>
        <Parallax speed={-10}>
          <h1>Hello</h1>
        </Parallax>

        <div style={{ height: '800px' }}>

        </div>
      </ParallaxProvider>
    </div>
  );
};

export default ParallaxBackground;