import React, { useState } from 'react';
import './home.css';

const Home = () => {
  // State to store the entered data
  const [enteredData, setEnteredData] = useState('');
  const [pop, setPopData] = useState('');
  const [popClass, setPopClass] = useState('');

  // Function to handle textarea changes
  const handleTextareaChange = (e) => {
    setEnteredData(e.target.value);
  };

  const handleSendClick = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    // Log the entered data
    console.log('Entered data:', enteredData);
  
    fetchData(enteredData)
      .then((isBadValue) => {
        console.log(isBadValue);
        // Handle isBadValue here
        if (isBadValue) {
          // Show popup or perform other actions
          console.log('Bad message detected!');
          setPopData('Bad message detected!');
          setPopClass('bad-message');
        } else {
          // Show popup or perform other actions
          console.log('Message is clean');
          setPopData('Message is clean');
          setPopClass('ok-message');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };
  


  async function fetchData(enteredData) {
    const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8dc9c1d272msh91e6ef9d5046f47p195507jsn7bc0ee65d8f6',
            'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
        },
        body: new URLSearchParams({
            content: enteredData
        })
    };

    try {
        const response = await fetch(url, options);
        if( response.status!==200){
            console.log("Error");
        }
        else{
            const result = await response.text();
            const jsonObject = JSON.parse(result);
            const isBadValue = jsonObject['is-bad'];
            
            return isBadValue;
        }
      
    } catch (error) {
        console.error(error);
    }
}



  return (
    <div className="home">
      <h2 className="title">Welcome to Watcher</h2>
      <div className="create">        
        <form>
          <label className="label">How are you?</label>
          <br />
          <textarea
            className="data"
            id="data"
            type="text"
            placeholder="Enter a message"
            value={enteredData}
            onChange={handleTextareaChange}
          ></textarea>
          <br />
          <button id="send" className="btn" onClick={handleSendClick}>
            Check
          </button>
        </form>

      </div>

     <p className={popClass}> {pop}</p>

    </div>
  );
};

export default Home;