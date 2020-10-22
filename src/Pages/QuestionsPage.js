import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const QuestionsPage = ({match}) => 
{
	const number=match.params.ID;
	const [questions, setquestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const history = useHistory();
	const handleAnswerOptionClick = async (isCorrect) => 
	{
		debugger;
		if (isCorrect) {
			setScore(score + 1);
		}
		 
		await  axios({
			method: 'post',
			url: `http://localhost:64602/api/WeatherForecast/UpdateAnswers`,
			data: JSON.stringify(isCorrect),
			headers: {
			  'Access-Control-Allow-Origin': 'http://localhost:64602/',
			  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
			  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			  'Content-Type': 'application/json',
			},
			})
			.then(function (response) {
				debugger;
				console.log(response);
			})
			.catch(function (response) {
			 
				console.log(response);
			});
			
			//


		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);

			history.push("/");
		}
	};
	const GetAllQuestionWithOption= async () =>
    {
      await  axios({
        method: 'get',
        url: `http://localhost:64602/api/WeatherForecast/GetAllQuestionWithOption?ID=${number}`,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:64602/',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        })
        .then(function (response) {
			debugger;
			setquestions(response.data);
            console.log(response);
        })
        .catch(function (response) {
         
            console.log(response);
        });
    };

	useEffect(()=>
	{
		//
		GetAllQuestionWithOption();

	},[number]);


	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
				{
						questions.length >0 ?
						(
						<div>
						<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionName}</div>
					</div> 
					 <div className='answer-section'>
						{questions[currentQuestion].options.map((answerOption,key) => (
							<button key={key} onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption.name}</button>
						))}
					</div>
						</div>
						):
						(
							<div>no result found</div>
						)
				}
					
				</>
			)}
		</div>
	);

};

export  default QuestionsPage;