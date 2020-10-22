
import React from 'react';


const QuestionAsw=({QuestionAswers})=>
{
    return(
    <React.Fragment>
    <div>
        <h1>Question And Anwers</h1>
       {QuestionAswers.map((article,key)=>
       (
           <div>
       <p>Questions : {article.questionName}</p>
       <h3>Answer : {article.answer}</h3>
       </div>
       ))}
    </div>
    </React.Fragment>
    );
}
 
 export default  QuestionAsw;