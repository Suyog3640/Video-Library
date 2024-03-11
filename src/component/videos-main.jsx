import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

export function VideosMain()
{
    return(
        <div>
            <div className="mt-5">
                <main className="d-flex justify-content-evenly mt-4 col-xxl-10">
                    <div className="col-xl-5 col-xxl-5">
                        <div>
                            <h1> <span className="bi bi-play-circle-fill"></span> Watch Videos Any Where</h1>
                            <p className="mt-4 mb-4 h5">Please register for more technology videos</p>
                        </div>
                        <div className="input-group d-flex">
                            {/* <input className="form-control w-auto" type="email" placeholder="Your email address" /> */}
                            <TextField className="form-control w-auto" variant="filled" label="Your email address" />
                            {/* <button className="btn btn-info form-control">Get Started</button> */}
                            <Button variant="contained" color="info">Get Started</Button>
                        </div>
                        <p></p>
                    </div>
                    <div className="col-sm-3 col-md-5 col-lg-6 col-xxl-6"></div>
                </main>
            </div>
            
            <motion.div
            className="box col-12 col-md-6 col-sm-9 col-xl-6 col-xxl-5 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }} 
            >
                <img src="poster.png" height="360" width="360" />
            </motion.div> 
        </div>
    )
}