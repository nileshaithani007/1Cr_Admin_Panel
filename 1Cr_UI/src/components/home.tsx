import { Imagesdata } from '../commondata/commonimages'
import { Helmet } from 'react-helmet-async'

const home = () => {
  return (
    <>
    <Helmet><title>Matrxd by OneSource - Home</title></Helmet>
    <div className='container bg-white d-flex justify-items-center align-items-center' style={{ padding: '28px', height: 'calc(100vh - 10vh)' }}>
    <div className="row">
      <div className="col-lg-12">
        <p className='fs-6'>Dear Colleague,</p>
        <h3 className='text-center'>Welcome to <b>MATRXD!</b>, the brainchild of our innovative OneSource Digital team for <br /> <b>M</b>anaging <b>D</b>igital <b>T</b>ransformation <b>X</b>perience.</h3>
        <p className='text-center fs-6' style={{ padding: '0px 20px' }}>
          MATRXD is designed to revolutionize the way we manage digital transformation projects. We do not consider this as just another tool; we will continue to upgrade it to enable provide superior experience to our stakeholders. MATRXD boasts a plethora of features that will make your digital transformation journey with us seamless. From submitting use cases for project consideration and efficient project tracking, to real-time collaboration, statistics, project videos and KPIs, this in-house marvel will help simplify complexities and amplify experiences.
        </p>
        <p className='text-center fs-6' style={{ padding: '0px 20px' }}>
          Embark on a journey with MATRXD and witness firsthand its magic - from intuitive user interfaces <br />
          to customizable dashboards that make data analysis a breeze.
        </p>
        <p className='text-center fs-6' style={{ padding: '0px 20px' }}>
          Say hello to a new era of streamlined project management.
        </p>
        <p className='text-center fs-6' style={{ padding: '0px 20px' }}>
          We value your thoughts and feedback, so don't hesitate to reach out to us at <br /><a href="mailto:osdigital@estee.conn" style={{textDecoration:'underline'}}>osdigital@estee.com</a> with your insights and suggestions.
        </p>
        <div className='d-flex align-items-center justify-content-center'>
          <img src={Imagesdata("msl_bottom_logo")} alt="one-source-digital" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
    {/* <ModalTable/> */}
  </div>
  </>
  )
}

export default home