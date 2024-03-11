import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { VideosMain } from './component/videos-main';
import { UserRegister } from './component/user-register';
import { UserLogin } from './component/user-login';
import { AdminDashboard } from './component/admin-dashboard';
import { UserDashboard } from './component/user-dashboard';
import { AdminLogin } from './component/admin-login';
import { AddVideo } from './component/add-video';
import { EditVideo } from './component/edit-video';
import { DeleteVideo } from './component/delete-video';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function SignoutComponent()
{
   let navigate = useNavigate();
   const[cookies, setCookie, removeCookie] = useCookies('userName');
   function handleSignout()
   {
      removeCookie('userName');
      navigate('/userlogin');
   }
   return(
      <button className='btn btn-info me-2' onClick={handleSignout}> <span className='bi bi-power'></span> SignOut</button>
   )
}

function AdminSignoutComponent()
{
  let navigate = useNavigate();
  const[admincookies, setAdminCookie, removeAdminCookie] = useCookies('adminName');
  function handleAdminSignout()
  {
     removeAdminCookie('adminName');
     navigate('/adminlogin');
  }
  return(
    <button className='btn btn-info me-2' onClick={handleAdminSignout}> <span className='bi bi-power'></span> SignOut</button>
  )
}

function App() {

  const[cookies, setCookie, removeCookie] = useCookies('userName');
  const[admincookies, setAdminCookie, removeAdminCookie] = useCookies('adminName');

  return (
    <div className="container-fluid bg-dark text-light bg-img overflow-x-auto overflow-y-auto" style={{height:'100vh'}}>
      <div className=''>
      <BrowserRouter>
        <header className='d-flex justify-content-between p-1 pb-4 pt-4'>
            <div className='col-5 col-lg-8 col-md-7 col-sm-6 col-xl-8 col-xl-9 col-xxl-9 ps-xxl-2'>
                <span className='h3'> <Link style={{color:'white', textDecoration:'none'}} to='/'> <img className='rounded-5 mb-1' src='VL-logo.jpg' height="35" width="35" /> Video <span className='text-info'>Library</span> </Link> </span>
            </div>
            <div className='col-6 col-lg-4 col-md-5 col-sm-6 col-xl-3 col-xxl-3 d-flex flex-fill ms-xxl-5'> 
                {
                    (cookies['userName']===undefined) ? <Link to='/userlogin' className='btn btn-info me-2'> <span className='bi bi-person-circle'></span> User SignIn </Link> : <SignoutComponent />
                }
                {
                  (admincookies['adminName']===undefined) ? <Link to='/admindashboard' className='btn btn-info'> <span className='bi bi-person-fill-gear'></span> Admin Dashboard </Link> : <AdminSignoutComponent />
                }
            </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<VideosMain />} />
            <Route path='uregister' element={<UserRegister />} />
            <Route path='userlogin' element={<UserLogin />} />
            <Route path='userdashboard' element={<UserDashboard />} />
            <Route path='adminlogin' element={<AdminLogin />} />
            <Route path='admindashboard' element={<AdminDashboard />} />
            <Route path='addvideo' element={<AddVideo />} />
            <Route path='editvideo/:id' element={<EditVideo />} />
            <Route path='deletevideo/:id' element={<DeleteVideo />} />
          </Routes>
        </section>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
