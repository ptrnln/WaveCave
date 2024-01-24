import { useEffect } from "react";

export default function Splash() {


    const splash = <canvas 
      className='splash'
      width={window.innerWidth}
      height={window.innerHeight}
    />
    
    useEffect(() => {
        
        const canvas = document.querySelector('canvas.splash');
        const ctx = canvas.getContext('2d');
        const splashImage = new Image(canvas.width, canvas.height);
        
        splashImage.src = "../../public/pexels-martin-lopez-2240771.jpg"
        splashImage.width = Math.floor(splashImage.width / 4);
        splashImage.height = Math.floor(splashImage.height / 4);
        canvas.addEventListener('resize', (e) => {
            splashImage.width = canvas.innerWidth
            splashImage.height = canvas.innerHeight
        })
        let frame;
        const canvasRender = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(splashImage, 0, 0);
            frame = requestAnimationFrame(canvasRender);
            console.log('splash animation frame')
        }
        splashImage.onload = () => {
            canvasRender()
        }
        return () => {
            cancelAnimationFrame(frame)
        }
    }, [])
    
    window.addEventListener('resize', (e) => {
      document.querySelector('.splash').width = window.innerWidth;
      document.querySelector('.splash').height = window.innerHeight;
    })
    return splash
  }