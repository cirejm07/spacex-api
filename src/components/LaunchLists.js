import './LaunchLists.css'


export default function LaunchLists({data, error, searchTerm, setSearchTerm, isLoading}) {

    

  return (
    <div className="launch-lists">
        <div className="container">
        <h1>Launch Lists</h1>
               <div className="search-container">
               <input id='text-box' className='search-textbox' onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder=' ' />
               <label htmlFor="text-box" className='search-label'>Search Flights by name</label>
               </div>
            <div className="sub-container">
                {error && <div>{error}</div>}
                    {data.length > 0 ? data.filter(val => {
                        if(searchTerm === ""){
                            return val
                        } else if(
                            val.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                            ){
                            return val
                        }
                    }).map((flight,index) => {
                        return(
                            <div className='details' key={flight.id}>
                        <div className='details-left'>
                            <img src={flight.links.patch.small} alt={flight.name} style={{width: '60px',height: '60px'}} />
                        </div>
                        <div className='details-right'>
                            <div>
                                <span>{flight.flight_number}: </span>
                                <span>{flight.name}</span>
                                <span>&nbsp; ( {new Date(flight.date_utc).getFullYear()} )</span>
                            </div>
                            <div><span>Details: {flight.details && flight.details.toString().substring(0,200)} ...</span> <a href={flight.links.article} rel="noopener noreferrer" target="_blank" className='see-more'>see more</a> </div>
                        </div>
                </div>
                        )
                    }) : <div style={{textAlign: 'center', fontSize:'40px'}}>Fetching Data</div>}   
            </div>
        </div>
    </div>
  )
}
