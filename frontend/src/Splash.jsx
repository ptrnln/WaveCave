import { useEffect } from "react";
import './Splash.css'

export default function Splash() {


    const splash = <canvas 
      className='splash'
      width={window.innerWidth}
      height={window.innerHeight}
    />

    const onLoader = () => {

    }
    
    
        
    const canvas = document.createElement('canvas');
    const splashImage = new Image();
    //     
    splashImage.src = "/pexels-martin-lopez-2240771.jpg"
    
    splashImage.onload = (e, width = window.width) => {
        // 
        // canvas.width = splashImage.width;
        // canvas.height = splashImage.height;
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(splashImage, 0, 0);
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        const ratio = splashImage.height / splashImage.width
        splashImage.width = this?.width;
        splashImage.height = splashImage.width * ratio; 

        
        document.querySelector('div.splash').appendChild(splashImage)
    }

   
    //     splashImage.width = Math.floor(splashImage.width / 4);
    //     splashImage.height = Math.floor(splashImage.height / 4);
    //     let frame;
    //     const canvasRender = () => {
            
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         frame = requestAnimationFrame(canvasRender);
    //         console.log('splash animation frame')
    //     }
    //     splashImage.onload = () => {
    //         canvasRender()
    //     }
    //     return () => {
    //         cancelAnimationFrame(frame)
    //     }

    return (
        <div className="splash wrapper">

        </div>
    )
  }