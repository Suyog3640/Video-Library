import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function AddVideo()
{
    let navigate = useNavigate();
    const[category, setCategory] = useState([{Category_Id:0, CategoryName:''}]);

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Likes: '',
            Comments: '',
            Category_Id: 0
        },
        validationSchema: yup.object({
            VideoId: yup.number().required("Video Id Required"),
            Title: yup.string().required("Title Required"),
            Url: yup.string().required("Url Required"),
            Category_Id: yup.number().required("Category Required")
        }),
        onSubmit: (values)=>{
            console.log(values);
            axios.post('http://127.0.0.1:2200/addvideo', values);
            alert('Video Added Successfully..');
            navigate('/admindashboard');
        }
    })

    function LoadCategories()
    {
        axios.get('http://127.0.0.1:2200/categories')
        .then((response)=>{
            response.data.unshift({Category_Id:-1, CategoryName:'Select Category'});
            setCategory(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
    },[]);

    return(
        <div className="bg-black mb-5 p-4 border border-info rounded-2 shadow col-sm-7 col-md-5 col-lg-5 col-xl-4 col-xxl-3">
            <h3> <span className="bi bi-play-circle-fill"></span> New Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dt>Video Id</dt>
                <dd><input type="number" name="VideoId" className="form-control" onChange={formik.handleChange} /></dd>
                <dd className="text-danger">{formik.errors.VideoId}</dd>
                <dt>Title</dt>
                <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange} /></dd>
                <dd className="text-danger">{formik.errors.Title}</dd>
                <dt>Url</dt>
                <dd><input type="text" name="Url" className="form-control" onChange={formik.handleChange} /></dd>
                <dd className="text-danger">{formik.errors.Url}</dd>
                <dt>Likes</dt>
                <dd><input type="number" name="Likes" className="form-control" onChange={formik.handleChange} /></dd>
                <dt>Comments</dt>
                <dd><input type="text" name="Comments" className="form-control" onChange={formik.handleChange} /></dd>
                <dt>Category</dt>
                <dd>
                    <select name="Category_Id" className="form-control" onChange={formik.handleChange}>
                        {
                            category.map(category=>
                                <option value={category.Category_Id} key={category.Category_Id}>
                                    {category.CategoryName.toUpperCase()}
                                </option>
                                )
                        }
                    </select>
                </dd>
                <dd className="text-danger">{formik.errors.Category_Id}</dd>
                <button className="btn btn-info">Add</button>
                <Link to='/admindashboard' className="btn btn-info ms-2">Cancel</Link>
            </form>
        </div>
    )
}