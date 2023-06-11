import { useEffect, useState } from "react";
import ClaimTable from "./ClaimTable"
import { APISERVICE } from "../../services/api.service";
import './claim.css'
const Claim = () => {

    useEffect(() => {
        console.log('reclamos')
        getClaims();
    },[])

    const [claims, setClaims] = useState([]) 
    const [pageInfo, setPageInfo] = useState({});

    const getClaims = async ( pageNUmber=1) => {
        const url = 'sugerencia/?';
        const params =  `page=${pageNUmber}`;
        const { success, claims, pageInfo } = await APISERVICE.get(url, params);
        if(success){
            setClaims(claims);
            setPageInfo(pageInfo);
        }
    }

  return (
    <section className="claim-content">
        <h3>Quejas y sugerencias</h3>
        <ClaimTable claims={claims} pageInfo={pageInfo} getClaims={getClaims}/>
    </section>
  )
}
export default Claim