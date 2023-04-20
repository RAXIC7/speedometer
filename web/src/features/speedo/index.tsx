import React from "react";
import Progress from "./components/Progress";

import { SpeedoProps } from "../../typings/speedo";
import { isEnvBrowser } from "../../utils/misc";
import { BsFuelPumpFill } from "react-icons/bs";
import { useNuiEvent } from "../../hooks/useNuiEvent";

import './index.css'

const Speedo: React.FC = () => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const [speed, setSpeed] = React.useState<number>(0)
    const [gear, setGear] = React.useState<number>(0)
    const [maxGear, setMaxGear] = React.useState<number>(0)
    const [fuel, setFuel] = React.useState<number>(0)
    const [maxFuel, setMaxFuel] = React.useState<number>(0)

    if (isEnvBrowser()) {
        React.useEffect(() => {
            setVisible(true)
            setGear(3)
            setMaxGear(7)
            setSpeed(135)
            setFuel(50)
            setMaxFuel(75)
        })
    } else {
        useNuiEvent('hideSpeedo', () => setVisible(false))
        useNuiEvent('updateSpeedo', (data: SpeedoProps) => {
            if (!visible) setVisible(true)

            setGear(data.gear)
            setMaxGear(data.maxGear)
            setSpeed(data.speed)
            setFuel(data.fuel)
            setMaxFuel(data.maxFuel)
        })
    }

    return (
        <>
            {visible && (
                <div className="speedo-wrapper">
                    <div className="speedo-container">
                        <div className="speedo-top">
                            <div className="speedo-speed">
                                <span className="speedo-speed-number">{speed}</span>
                                <span className="speedo-speed-text">mp/h</span>
                            </div>

                            <div className="speedo-gears">
                                <span className="speedo-speed-gear">{gear}</span>
                                <Progress progress={((gear / maxGear) * 100)} width="4vw" height=".3vw" borderRadius=".1vw" backgroundColor="rgb(155, 63, 63)"/>
                            </div>
                        </div>

                        <div className="speedo-bottom">
                            <div className="speedo-fuel">
                                <BsFuelPumpFill className="speedo-fuel-icon" />
                                <Progress progress={(fuel / maxFuel) * 100} width="7vw" height=".6vw" borderRadius=".3vw" text={fuel} backgroundColor="#ab70ff" />
                            </div>
                        </div>
                    </div>
                </div>            
            )}
        </>
    )
}

export default Speedo