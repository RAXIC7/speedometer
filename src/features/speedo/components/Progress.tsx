import React from "react";

const Progress: React.FC<{ progress: number, width: string, height: string, borderRadius: string, text?: string | number, backgroundColor: string }> = ({ progress, width, height, borderRadius, text, backgroundColor }) => {    
    return (
        <>
            <div className="progress-wrapper" style={{ width: width, height: height, borderRadius: borderRadius }}>
                <div className="progress-progress" style={{ width: `${progress}%`, backgroundColor: backgroundColor }}>{text && text}</div>
            </div>
        </>
    )
}

export default Progress