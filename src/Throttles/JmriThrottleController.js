import React, { useEffect } from 'react';

export const JmriThrottleController = props => {

    const { jmriApi, speed, forward, address } = props;

    const stop = async () => await jmriApi.throttle(address, 0, !forward);
    const changeDireaction = async () => await jmriApi.changeDirection(address, (speed > 0));

    useEffect(() => {
        const updateThrottle = async () => {
            try {
                if (speed < 0) { // backward
                    if (forward !== false) {
                        try {
                            await stop();
                        } catch (err) {
                            console.error(err);
                            throw err;
                        } finally {
                            await changeDireaction();
                        }
                    }

                } else if (speed > 0) { //forward
                    if (forward !== true) {
                        try {
                            await stop();
                        } catch (err) {
                            console.error(err);
                            throw err;
                        } finally {
                            await changeDireaction();
                        }
                    }
                    
                }
                await jmriApi.throttle(address, Math.abs(speed), forward);
            } catch (err) {
                console.error(err);
            }
        };
        updateThrottle();
    }, [jmriApi, speed, address, forward]);

    return (<></>)
}

export default JmriThrottleController;
