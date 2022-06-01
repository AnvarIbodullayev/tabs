import { useEffect, useState } from 'react';
import './App.css';
import { ImPointRight } from 'react-icons/im';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if(loading === true) {
    return (
      <div className='loader d-flex justify-content-center'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <div className="App mt-4">
      <h2>Tabs</h2>

      {/* tabs */}
      <div className='container'>
        <div className='row'>
          {/* buttons */}
          <div className='block left col-lg-2 col-md-12'>
            <div className='row m-0 p-0'>
              {
                jobs.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setValue(index)}
                      className={`btn-block col-lg-12 col-4 ${index === value && "active-btn"}`}
                    >{item.company}</button>
                  )
                })
              }
            </div>
          </div>
          {/* cards */}
          <div className='block right col-lg-10 col-md-12'>
            <div className="card">
              <h5 className="card-header">{title}</h5>
              <div className="card-body">
                <p className="card-text">{dates}</p>
                <span className="badge rounded-pill text-bg-warning">{company}</span>
                <div className='duties row mt-4 p-0'>
                  {
                    duties.map((dutie, index) => {
                      return(
                        <div key={index} className='item col-lg-12 text-left'>
                          <ImPointRight />
                          <p>
                            {dutie}
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
