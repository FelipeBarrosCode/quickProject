
import FlightList from "../components/FlightList";
import NoResults from "../components/NoResult";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';


export default function Results() {

 

    const navigate = useNavigate()
     
    const GET_FLIGHTS = gql`
    query GetFlights($from: String, $to: String) {
    flights(from: $from, to: $to) {
    id
from
to
price
airline
departureTime
}
}
`;


    function useQueryParams() {
        return new
        URLSearchParams(useLocation().search);
        }

        

        const query = useQueryParams();
        const from = query.get('from');
        const to = query.get('to');

        const { loading, error, data } = useQuery(GET_FLIGHTS, {
            variables: { from, to },
            });

   



    

        const flights = data?.flights || [];

    // if (isLoading) {

    //     return (
    //         <>

    //             <ClipLoader color="#ffffff"
    //                 loading={isLoading}
    //                 size={150}
    //                 aria-label="Loading Spinner"
    //                 data-testid="loader"
    //             />


    //         </>
    //     )
    // }

   

    if (!from || !to) {
        return <p>Waiting for search
        parameters...</p>;
        }

       
if (error) return <p>Error loading
flights.</p>;


    return (<>
        <div>
            <ul>

                

                {
                    loading ? <>
                        <ClipLoader color="#ffffff"
                    loading={loading ? true : false}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                    
                    </> : flights.length != 0 ? 
                    <>
                    <FlightList flights={flights} /> 
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate("/")
                    }}>Back To Home Page</button>
                    </>
                    
                    : 
                    
                    
                    <>
                    <NoResults from={from} to={to} />

                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate("/")
                    }}>Back To Home Page</button>
                    </>
                }

               

            </ul>
        </div>
    </>)
}