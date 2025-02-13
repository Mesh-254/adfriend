import React from 'react'

const Time = () => {

    let time = new Date();
    time = time.toDateString();

    console.log(time);

    return (
        <div>Time- {time}</div>
    )
}

export default Time;