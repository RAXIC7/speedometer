import React from "react";
import Progress from "./components/Progress";

import { SpeedoProps } from "../../typings/speedo";
import { isEnvBrowser } from "../../utils/misc";
import { BsFuelPumpFill } from "react-icons/bs";
import { useNuiEvent } from "../../hooks/useNuiEvent";

import './index.css'

const Speedo: React.FC = () => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const [data, setData] = React.useState<SpeedoProps>({ gear: 3, maxGear: 7, speed: 135, fuel: 50, maxFuel: 75 })

    if (!isEnvBrowser()) {
        useNuiEvent('hideSpeedo', () => setVisible(false))
        useNuiEvent('updateSpeedo', (data: SpeedoProps) => {
            if (!visible) setVisible(true)

            setData(data)
        })
    }

    return (
        <>
            {visible && (
                <div className="speedo-wrapper">
                    <div className="speedo-container">
                        <div className="speedo-top">
                            <div className="speedo-speed">
                                <span className="speedo-speed-number">{data.speed}</span>
                                <span className="speedo-speed-text">mp/h</span>
                            </div>

                            <div className="speedo-gears">
                                <span className="speedo-speed-gear">{data.gear}</span>
                                <Progress progress={((data.gear / data.maxGear) * 100)} width="4vw" height=".3vw" borderRadius=".1vw" backgroundColor="rgb(155, 63, 63)"/>
                            </div>
                        </div>

                        <div className="speedo-bottom">
                            <div className="speedo-fuel">
                                <BsFuelPumpFill className="speedo-fuel-icon" />
                                <Progress progress={(data.fuel / data.maxFuel) * 100} width="7vw" height=".6vw" borderRadius=".3vw" text={data.fuel} backgroundColor="#ab70ff" />
                            </div>
                        </div>
                    </div>
                </div>            
            )}
        </>
    )
}

export default Speedo