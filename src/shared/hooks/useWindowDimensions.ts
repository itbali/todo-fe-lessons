import {useEffect, useState} from "react";

export const useWindowDimensions = ()=>{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    useEffect(()=>{
        const handleResize = ()=>{
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }

        window.addEventListener("resize", handleResize)
    },[])

    return {
        width: windowWidth,
        height: windowHeight,
        isVertical: windowHeight>windowWidth,
        isMobile: windowWidth<=768
    }
}