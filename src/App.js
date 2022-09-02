import clsx from 'clsx';
import LaunchLists from './components/LaunchLists';
import useLazyLoad from './hooks/useLazyLoad';
import { useState, useEffect,useRef } from "react"
import Loading from './components/Loading';


function App() {



  const [getData, setData] = useState([])
  const [error, setError]= useState(null)
  const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        
        const fetchData = async () => {

            try{

                const response = await fetch('https://api.spacexdata.com/v4/launches/')
                if(!response.ok){
                    throw new Error(response.statusText)
                  }
                console.log(response);
                const json = await response.json()
                setData(json)
                setError(null)
            }
            catch(err){
                console.log(err)
                setError('Could not fetch data')
            }

        }
        fetchData()

        
        
    },[])

    console.log(getData);
    
    const NUM_PER_PAGE = 4;
const TOTAL_PAGES = 100;
const launch = getData
const triggerRef = useRef(null)
const onGrabData = (currentPage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data2 = launch.slice(
        ((currentPage-1)%TOTAL_PAGES)*NUM_PER_PAGE,
        NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
      );
      resolve(data2)
    },1000)
  })
}

const { data, loading } = useLazyLoad({triggerRef, onGrabData})


  return (
    <div>
    <div className="App">
     <LaunchLists data={data} error={error} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <div ref={triggerRef} className={clsx('trigger', {visible: loading})}>
      <Loading />
    </div>
    </div>
  );
}

export default App;
