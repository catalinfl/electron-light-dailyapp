import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useRef } from 'react'

const Bar = () => {

    const handleCloseWindow = () => {
        ipcRenderer.send('close-window')
    }

    const [initialX, setInitialX] = useState<number>(0)
    const [initialY, setInitialY] = useState<number>(0)


    const handleMove = useRef<HTMLDivElement>(null);

    let isDragging: boolean = false;      
    useEffect(() => {

        handleMove.current?.addEventListener('mousedown', (e) => {
            setInitialX(Math.floor(e.clientX));
            setInitialY(Math.floor(e.clientY));
    
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp);    
            isDragging = true;
        })

    }, []) 
    function handleMouseMove(event: MouseEvent) {
        const distanceX = Math.floor(event.clientX - initialX);
        const distanceY = Math.floor(event.clientY - initialY);
        var limitedDistanceX, limitedDistanceY;
        const maxDistance = 100;
        limitedDistanceX = Math.max(-maxDistance, Math.min(distanceX, maxDistance));
        limitedDistanceY = Math.max(-maxDistance, Math.min(distanceY, maxDistance));
        if (limitedDistanceX !== distanceX || limitedDistanceY !== distanceY) {
         ipcRenderer.send('move-window', { distanceX: limitedDistanceX, distanceY: limitedDistanceY });
        }
    }

    function handleMouseUp(_: MouseEvent) {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp);
        isDragging = false;
    }

    return (
        <div className="bar" ref={handleMove}>
            <div className="bar__buttons">
                <button className="bar_button" onClick={() => handleCloseWindow()}>
                    <AiOutlineClose />
                </button>
            </div>
        </div>
        )
}

export default Bar