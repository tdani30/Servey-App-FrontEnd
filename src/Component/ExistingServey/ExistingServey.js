
import React from 'react';
import {Link} from 'react-router-dom';


const ExistingServey=({ServeyData})=>
{
    return(
    <React.Fragment>
    <div>
        <h1>Existing Servey</h1>
       {ServeyData.map((article,key)=>
       (
           <Link className="article-list-item" key={key} to={`/QuestionsPage/${article.id}`}>
               <h3>{article.servey_Title}</h3>
           </Link>
       ))}
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    </React.Fragment>
    );
}
 
 export default  ExistingServey;