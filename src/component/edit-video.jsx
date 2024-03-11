import axios from "axios";
import { useFormik } from "formik"
import { useEffect } from "react";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";


export function EditVideo()
{
    let navigate = useNavigate();
    let params = useParams();
    const[category, setCategory] = useState([{Category_Id:0, CategoryName:''}]);
    const[videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Comments:'', Category_Id:0}]);

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Likes: videos[0].Likes,
            Comments: videos[0].Comments,
            Category_Id: videos[0].Category_Id
        },
        enableReinitialize: true,
        onSubmit: (values) =>{
            axios.put(`http://127.0.0.1:2200/editvideo/${params.id}`, values);
            alert('Video Updated..');
            navigate('/admindashboard');
        }
    })

    function LoadCategories()
    {
        axios.get('http://127.0.0.1:2200/categories')
        .then(response=>{
            response.data.unshift({Category_Id:-1, CategoryName:'Select Category'});
            setCategory(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:2200/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);

    return(
        <div className="bg-black mb-5 p-4 border border-info rounded-2 shadow col-sm-7 col-md-5 col-lg-5 col-xl-4 col-xxl-3">
            <h3> <span className="bi bi-play-circle-fill"></span> Edit Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" name="VideoId" className="form-control" value={formik.values.VideoId} onChange={formik.handleChange} /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" className="form-control" value={formik.values.Title} onChange={formik.handleChange} /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" className="form-control" value={formik.values.Url} onChange={formik.handleChange} /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" className="form-control" value={formik.values.Likes} onChange={formik.handleChange} /></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name="Comments" className="form-control" value={formik.values.Comments} onChange={formik.handleChange} /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="Category_Id" className="form-control" value={formik.values.Category_Id} onChange={formik.handleChange} >
                            {
                                category.map(category=>
                                    <option value={category.Category_Id} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-info">Save</button>
                <Link to='/admindashboard' className="btn btn-info ms-2">Cancel</Link>
            </form>
        </div>
    )
}