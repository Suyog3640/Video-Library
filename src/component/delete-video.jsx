import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteVideo()
{
    let navigate = useNavigate();
    let params = useParams();
    const[videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Comments:'', Category_Id:0}]);

    function handleDeleteClick()
    {   
        axios.delete(`http://127.0.0.1:2200/deletevideo/${params.id}`);
        alert('Video Deleted..');
        navigate('/admindashboard');
    }

    useEffect(()=>{
       axios.get(`http://127.0.0.1:2200/video/${params.id}`)
       .then(response=>{
            setVideos(response.data);
       }) 
    },[]);

    return(
        <div className="bg-black p-4 border border-info rounded-2 shadow col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
            <h3> <span className="bi bi-play-circle-fill"></span> Delete Video</h3>
            <div>
                <h3 className="border-2 border-bottom border-info pb-3">{videos[0].Title}</h3>
                <iframe src={videos[0].Url}></iframe>
            </div>
            <div className="border-2 border-info border-top pt-4">
                <button className="btn btn-info me-2" onClick={handleDeleteClick}>Delete</button>
                <Link to='/admindashboard' className="btn btn-info">Cancel</Link>
            </div>
        </div>
    )
}