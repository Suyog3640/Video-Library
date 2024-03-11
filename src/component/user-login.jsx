import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function UserLogin()
{
    let navigate = useNavigate();
    const[users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const[userError, setUserError] = useState('');

    const[cookies, setCookie, removeCookie] = useCookies('userName');

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        validationSchema: yup.object({
            UserId: yup.string().required("User Id Required"),
            Password: yup.string().required("Password Required")
        }),
        onSubmit: (values)=>{
            var user = users.find(item => item.UserId == values.UserId)
            if(user.Password===values.Password)
            {
                setCookie('userName', user.UserName);
                navigate('/userdashboard');
            } else
            {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:2200/users')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);

    return(
        <div className="bg-black p-4 border border-info rounded-2 shadow col-sm-9 col-md-5 col-xl-4 col-xxl-3">
            <h2 className="bi bi-person-fill">User Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.UserId}</dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dd className="text-danger">{formik.errors.Password}</dd>
                </dl>
                <button className="btn btn-info">Login</button>
                <Link to='/uregister' className="btn btn-info ms-2">New User ?</Link>
                <p className="h5 text-danger mt-2">{userError}</p>
            </form>
        </div>
    )
}