
import './LaunchLists.css'


export default function LaunchLists({data, error, searchTerm, setSearchTerm}) {

    

  return (
    <div className="launch-lists">
        <div className="container">
        <h1>Launch Lists</h1>
                <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search Flights by name" />
            <div className="sub-container">
                
                <p>{searchTerm}</p>
                {error && <div>{error}</div>}
                    {data && data.filter(val => {
                        if(searchTerm === ""){
                            return val
                        } else if(
                            val.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                            ){
                            return val
                        }
                    }).map((flight) => {
                        return(
                            <div className='details' key={flight.id}>
                        <div className='details-left'>
                            <img src={flight.links.patch.small} alt="" style={{width: '60px',height: '60px'}} />
                        </div>
                        <div className='details-right'>
                            <div>
                                <span>{flight.flight_number}</span>
                                <span>{flight.name}</span>
                                <span>( {new Date(flight.date_utc).getFullYear()} )</span>
                            </div>
                            <div>Details: {flight.details} </div>
                        </div>
                </div>
                        )
                    })}
            </div>
        </div>
    </div>
  )
}
