import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function AdminLogin()
{
    let navigate = useNavigate();
    const[users, setUsers] = useState([{UserId:'', Password:''}]);
    const[userError, setUserError] = useState('');

    const[cookies, setCookie, removeCookie] = useCookies('adminName');

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        validationSchema: yup.object({
            UserId: yup.string().required("Admin Id Required"),
            Password: yup.string().required("Password Required") 
        }),
        onSubmit: (values)=>{
            var user = users.find(item => item.UserId===values.UserId);
            if(user.Password===values.Password)
            {
                setCookie("adminName", user.UserId);
                navigate('/admindashboard');
            } else
            {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/admin')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);

    return(
        <div className="bg-black p-4 border border-info rounded-2 shadow col-sm-9 col-md-5 col-xl-4 col-xxl-3">
            <h2 className="bi bi-person-fill">Admin Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.UserId}</dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Password}</dd>
                </dl>
                <button className="btn btn-info">Login</button>
                <Link to='/' className="btn btn-info ms-2">Cancel</Link>
                <p className="h5 text-danger mt-2">{userError}</p>
            </form>
        </div>
    )
}