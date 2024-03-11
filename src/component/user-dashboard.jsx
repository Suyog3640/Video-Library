import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserDashboard()
{
    let navigate = useNavigate();
    const[cookies, setCookie, removeCookie] = useCookies('userName');
    const[videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Comments:'', Likes:'', CategoryId:0}]);

    function LoadVideos()
    {
        axios.get('http://127.0.0.1:2200/videos')
        .then((response)=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        if(cookies['userName']===undefined)
        {
            navigate('/userlogin');
        } else
        {
            LoadVideos();
        }

    },[]);

    return(
        <div className="mb-5">
            <h2>{cookies['userName']} - Dashboard</h2>
            <section className="d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className="card bg-black text-white border border-2 border-info rounded-2 p-2 m-2" style={{width:'400px'}}>
                            <div className="card-header border-bottom border-info" style={{height:'100px'}}>
                                <h3>{video.Title}</h3>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height="200">

                                </iframe>
                            </div>
                            <div className="card-footer border-info border-top">
                                <span className="bi bi-hand-thumbs-up"></span> {video.Likes} Likes
                                <div>
                                    <label className="form-label fw-bold mt-1">Comments:</label>
                                    <div>
                                        {video.Comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
        </div>
    )
}