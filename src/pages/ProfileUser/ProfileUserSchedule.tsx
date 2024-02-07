import {useParams} from "react-router-dom";
import React from "react";
import Schedule from "../../features/Schedule/Schedule";

const ProfileUserSchedule = () => {
    const {userId} = useParams();
    return <Schedule userId={parseInt(userId!)} manage={true}/>
}

export default ProfileUserSchedule;