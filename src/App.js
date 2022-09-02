import clsx from 'clsx';
import LaunchLists from './components/LaunchLists';
import useLazyLoad from './hooks/useLazyLoad';
import { useState, useEffect,useRef } from "react"
import Loading from './components/Loading';
import { useFetch } from './hooks/useFetch';


function App() {

const [url, setUrl] = useState('https://api.spacexdata.com/v4/launches/')
const {getData, error} = useFetch(url)
const [searchTerm, setSearchTerm] = useState('')
  // const [getData, setData] = useState([])
  // const [error, setError]= useState(null)
  // const [searchTerm, setSearchTerm] = useState('')

  const NUM_PER_PAGE = 4;
  const TOTAL_PAGES = 1000;
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

    // useEffect(() => {
        
    //   const controller = new AbortController()

    //     const fetchData = async () => {

    //         try{

    //             const response = await fetch('https://api.spacexdata.com/v4/launches/', {signal: controller.singal})
    //             if(!response.ok){
    //                 throw new Error(response.statusText)
    //               }
    //             // console.log(response);
    //             const json = await response.json()
    //             setData(json)
    //             setError(null)
    //             setIsLoading(false)
    //         }
    //         catch(err){
    //           if(err.name === "AbortError"){
    //             console.log('The fetch was aborted')
    //         } else {
    //           console.log(err)
    //           setError('Could not fetch data')
    //           setIsLoading(false)
    //         }
    //         }

    //     }
    //     fetchData()

    //     return () => {
    //       controller.abort()
    //     }
        
    // },[])

  // console.log(getData);
    
  


  return (
    <div>
    <div className="App">
     <LaunchLists data={data} error={error} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <div ref={triggerRef} className={clsx('trigger', {visible: loading})}>
      { data.length > 0 && searchTerm.length === 0  ? <Loading /> : null }
    </div>
    </div>
  );
}

export default App;
