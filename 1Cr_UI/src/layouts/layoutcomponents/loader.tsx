import { FC } from 'react';
import { Imagesdata } from '../../commondata/commonimages';

interface LoaderProps { }

const Loader: FC<LoaderProps> = () => (
    // <div >
    //     <div id="global-loader">
    //         <img src={Imagesdata("loader")} className="loader-img" alt="Loading...." />
    //     </div>
    // </div>

    <div style={{width: "100vw", height: "100vh", backgroundColor: "white"}}>
        <div className='d-flex flex-column align-items-center justify-items-center'>
            {/* <div className='spinner'></div> */}
            <img src={Imagesdata("msl_top_logo")} width={200} className="loader-img" alt="Loading...." />
        </div>
    </div>
);

export default Loader;
