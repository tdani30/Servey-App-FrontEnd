import React,{useState,useEffect} from 'react';
import Add from '../add.svg';
import 'react-toastify/dist/ReactToastify.css';
import QuestionModal from '../Component/Question-Modal/QuestionModal';
import axios from 'axios';
import ExistingServey from '../Component/ExistingServey/ExistingServey';
import QuestionAsw from '../Component/QuestionAswers/QuestionAswers';

const AdminPage= () =>
{
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
      setModalOpen(false);
    };
   const [ServeyData,setServeyData]=useState([{}]);
   const [QuestionAswers,setQuestionAswers]=useState([{}]);
    const GetServeyInformation=async ()=>
    {
      
    await  axios({
       method: 'get',
       url: 'http://localhost:64602/api/WeatherForecast/GetServey',
       headers: {
         'Access-Control-Allow-Origin': 'http://localhost:64602/',
         'Access-Control-Allow-Headers': 'Authorization, Content-Type',
         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
         'Content-Type': 'application/json',
       },
       })
       .then(function (response) {
        
         setServeyData(response.data);
           console.log(response);
       })
       .catch(function (response) {
        
           console.log(response);
       });
    };

    const GetAllQuestions= async () =>
    {
      await  axios({
        method: 'get',
        url: 'http://localhost:64602/api/WeatherForecast/GetAllQuestions',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:64602/',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        })
        .then(function (response) {
          setQuestionAswers(response.data);
            console.log(response);
        })
        .catch(function (response) {
         
            console.log(response);
        });
    };

    useEffect(()=>
    {
      GetServeyInformation();
      GetAllQuestions();
    },[]);
   
    return(
      <>
      <div>
        <ExistingServey ServeyData={ServeyData}></ExistingServey>
      </div>
      <div>
        <QuestionAsw QuestionAswers={QuestionAswers}></QuestionAsw>
      </div>
        <div className="App">
          <button className="add-question" onClick={_ => setModalOpen(true)}>
          <img src={Add} alt="Click to create a new question"/>
        </button>
        <QuestionModal
          isOpen={modalOpen}
          closeModal={closeModal}
        />
        </div>
        </>
    );
};

export default AdminPage;