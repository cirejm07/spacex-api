import { useState, useEffect } from "react"

export function useFetch(url) {

    const [getData, setData] = useState([])
    const [error, setError]= useState(null)
  

    useEffect(() => {
        
        const controller = new AbortController()
  
          const fetchData = async () => {
  
              try{
  
                  const response = await fetch(url, {signal: controller.signal})
                  if(!response.ok){
                      throw new Error(response.statusText)
                    }
                  // console.log(response);
                  const json = await response.json()
                  setData(json)
                  setError(null)
              }
              catch(err){
                if(err.name === "AbortError"){
                  console.log('The fetch was aborted')
              } else {
                console.log(err)
                setError('Could not fetch data')
              }
              }
  
          }
          fetchData()
  
          return () => {
            controller.abort()
          }
          
      },[url])

      return {getData, error}
}
