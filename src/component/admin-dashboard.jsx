import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function AdminDashboard()
{
    let navigate = useNavigate();
    const[cookies, setCookie, removeCookie] = useCookies('adminName');
    const[videos, setVideos] = useState([{VideoId:'', Title:'', Url:'', Comments:'', Likes:'', CategoryId:0}]);

    function LoadVideos()
    {
        axios.get('http://127.0.0.1:2200/videos')
        .then((response)=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
       if(cookies['adminName']===undefined)
       {
            navigate('/adminlogin');
       } else
       {
            LoadVideos();
       }
    },[]);

    return(
        <div>
            <h2> {cookies['adminName']} - Dashboard</h2>
            <div className="mb-4">
                <Link to="/addvideo" className="btn btn-info">New Video</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map(video=>
                                <tr key={video.VideoId}>
                                    <td width="200">{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width="300" height="100"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/editvideo/${video.VideoId}`} className="btn btn-info bi bi-pen-fill me-2 my-2"></Link>
                                        <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-info bi bi-trash-fill"></Link>
                                    </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>    
            </div>
        </div>
    )
}