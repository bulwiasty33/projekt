import { Link } from "react-router-dom"
import './Glowna.css';


function Glowna(){
    
        return <div className='tlo'>
            <div className="kontener">
            <div className="s">
            METFLIX
        </div>
        <div>
            
               
                <li><Link className="link" to="/losowe">Losowe</Link></li>
                <li><Link className="link" to="/wyszukiwanie">Wyszukiwarka</Link></li>
            
        </div>
        </div>
    </div>
   
}
export default Glowna