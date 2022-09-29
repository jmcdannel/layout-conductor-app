import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Store/Store';

export const JmriThrottleController = props => {

    const [ state, dispatch ] = useContext(Context);
    const { jmriApi, speed, forward, address } = props;
    const [ eventsAttached, setEventsAttached ] = useState(false);
    
    const handleSpeed = async ({ name, speed }) => {
        try {
            await dispatch({ type: 'UPDATE_LOCO', payload: { address: name, speed } });
        } catch(err) {
            console.error(err);
        }

    }
    
    const handleDirection = async ({ name, forward }) => {
        try {
            await dispatch({ type: 'UPDATE_LOCO', payload: { address: name, forward } });
            if (speed !== 0) {
                await jmriApi.throttle(address, Math.abs(speed));
            } 
        } catch(err) {
            console.error(err);
        }

    }

    useEffect(() => {
        if (!eventsAttached) {
            jmriApi.on('direction', 'JmriThrottleController', handleDirection);
            jmriApi.on('speed', 'JmriThrottleController', handleSpeed);
            setEventsAttached(true);
        }
    }, [jmriApi, handleDirection, handleSpeed, eventsAttached]);

    useEffect(() => {
        const updateThrottle = async () => {
        try {
            if (speed < 0) { // backward
                if (forward !== false) {
                    try {
                        await jmriApi.throttle(address, 0, false);
                    } catch (err) {
                        console.error(err);
                    } finally {
                        await jmriApi.changeDirection(address, false);
                    }
                }

            } else if (speed > 0) { //forward
                if (forward !== true) {
                    try {
                        await jmriApi.throttle(address, 0, true);
                    } catch (err) {
                        console.error(err);
                    } finally {
                        await jmriApi.changeDirection(address, true);
                    }
                }
                
            }
            await jmriApi.throttle(address, Math.abs(speed), forward);
        } catch (err) {
            console.error(err);
        }
            // }
        };
        updateThrottle();
    }, [jmriApi, speed, address, forward]);

    return (<></>)
}

export default JmriThrottleController;
