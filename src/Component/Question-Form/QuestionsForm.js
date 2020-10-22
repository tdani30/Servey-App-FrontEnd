import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import './form.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const QuestionsForm = ({ closeModal, questionCreate }) => {
  const [questionForm, setQuestion] = useState({
    options: [],
    question: '',
    answer: '',
    servey_Title: '',
  });
  const history = useHistory();
  const [FinalQuestions, setquest] = useState({
    Questions: [],
    servey_Title: '',
  });
  let PostData ={servey_Title:'',Questions: []}

  const inputProps = {
    placeholder: 'Add an option and press enter',
    className: 'question-input',
  };
   const AddQuestions = () => {
    
    PostData.Questions.push({answer:questionForm.answer,Options:questionForm.options,questionName:questionForm.question });//=questionForm.question;
    PostData.servey_Title=questionForm.servey_Title;
    setQuestion({
      options: [],
      question: '',
      image: {},
      answer: '',
      servey_Title: PostData.servey_Title,
    });
   
    debugger;
    setquest(
      {
        Questions:FinalQuestions.Questions.concat({answer:questionForm.answer,Options:questionForm.options,questionName:questionForm.question }),
        servey_Title:questionForm.servey_Title
      });
  };

  const handleSubmit = async (e) => {
   
    await axios({
      method: 'post',
      url: 'http://localhost:64602/api/WeatherForecast/CreateServey',
      data: JSON.stringify(FinalQuestions),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:64602/',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      })
      .then(function (response) {
          console.log(response);
          history.push("/");
      })
      .catch(function (response) {
          console.log(response);
      });
      setQuestion({
        options: [],
        question: '',
        image: {},
        answer: '',
        servey_Title: '',
      });
      closeModal();
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
     
    setQuestion({
      ...questionForm,
      [name]: value,
    });
  };

  const handleTagsChange = (options) => {

      options=options.map((data)=>
     {
        return {Name:data};
     });
    setQuestion({
      ...questionForm,
      options:options,
    });
  };
 
  
  return (
    <form action="" id="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="servey_Title"
        placeholder="Enter Title"
        onChange={handleInputChange}
        value={questionForm.servey_Title}
        className="question-input"
      />
      <input
        type="text"
        name="question"
        placeholder="Enter your question...."
        onChange={handleInputChange}
        value={questionForm.question}
        className="question-input"
      />
      <TagsInput
        value={questionForm.options.map((data)=>(data.Name))}
        onChange={handleTagsChange}
        maxTags={4}
        inputProps={inputProps}
      />
      <input
        type="text"
        placeholder="Add the answer to the question..."
        value={questionForm.answer}
        onChange={handleInputChange}
        className="question-input"
        name="answer"
      />
     
      <div className="submit-area">
        <button className="submit-button" onClick={()=>AddQuestions()}  type="button">
          Add Question
        </button>
      </div>
      <div className="submit-area">
        <button className="submit-button" type="submit">
          Create Questions
        </button>
      </div>
    </form>
  );
};

export default QuestionsForm;
