import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div
        className='container bg-white d-flex justify-items-center align-items-center'
        style={{
          padding: '28px',
          height: 'calc(100vh - 10vh)',
          overflowX: 'hidden', // Prevent horizontal scrolling
          margin: 0 // Ensure there's no extra margin
        }}
      >
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiMTNkYjA4MjktMjg0Ny00YjIwLWJkNzctYjQxNGUxNzIzMmZiIiwidCI6IjBmZDViOTZmLWU4YWMtNGU1Yi04YzA0LTc3YzcxOGJkZWZlZCJ9"
          frameBorder="0"
          style={{
            height: '100%',
            width: '100%',
            border: 'none' // Remove any border to prevent overflow
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
