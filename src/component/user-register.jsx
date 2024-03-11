import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function UserRegister()
{
    let navigate = useNavigate();
    const[users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const[userError, setUserError] = useState('');
    const[style, setStyle] = useState('');

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        validationSchema: yup.object({
            UserId: yup.string().required("User Id Required"),
            UserName: yup.string().required("User Name Required").min(4, "Name Too Short.."),
            Password: yup.string().required("Password Required"),
            Email: yup.string().required("Email Required").matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid Email"),
            Mobile: yup.string().required("Mobile Required").matches(/\+91\d{10}/, "Invalid Mobile")
        }),
        onSubmit: (user) => {
            axios.post('http://127.0.0.1:2200/adduser', user);
            alert('Registered Successfully..');
            navigate('/userlogin');
        }
    })

    function VerifyUser(e)
    {
        for(var user of users)
        {
            if(e.target.value==="")
            {
                setUserError("");
            }
            else if(user.UserId===e.target.value)
            {
                setUserError("User Id Taken - Try Another");
                setStyle('text-danger');
                break;
            } else
            {
                setUserError("User Id Available"); 
                setStyle('text-success');   
            }
        }
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);

    return(
        <div className="bg-black p-4 border border-info rounded-2 shadow col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
            <h2 className="bi bi-person-fill">User Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onKeyUp={VerifyUser} onChange={formik.handleChange} /></dd>
                    <dd className={style}>{userError}</dd>
                    <dd className="text-danger">{formik.errors.UserId}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.UserName}</dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Password}</dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Email}</dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Mobile}</dd>
                </dl>
                <button className="btn btn-info">Register</button>
                <Link to='/' className="btn btn-info ms-2">Cancel</Link>
            </form>
        </div>
    )
}