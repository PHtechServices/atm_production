import React, { useState, useEffect } from 'react';
import "../home/homeScreen.scss"
import ReactDOM from 'react-dom';
import "./menuButtons.css"
import axios from 'axios';
import TaskViewer from '../taskView/tasksViewer';
import 'reactjs-popup/dist/index.css';

function HomeScreen(props) {

  var message = props.name
  const [num, setNum] = useState(0)
  const [wish, setWish] = useState("")

  const quotes = ['“One child, one teacher, one book, one pen can change the world.” – Malala Yousafzai',
    '“When educating the minds of our youth, we must not forget to educate their hearts.”- Dalai Lama',
    '“A good teacher can inspire hope, ignite the imagination, and instill a love of learning.” – Brad Henry',
    '“It is the supreme art of a teacher to awaken joy in creative expression and knowledge.”- Albert Einstein',
    '“Intelligence plus character– that is the goal of true education.”- Martin Luther King Jr.',
    '“The secret in education lies in respecting the student.” – Ralph Waldo Emerson',
    '“Great teachers empathize with kids, respect them, and believe that each one has something special that can be built upon.”- Ann Liberman',
    '“A teacher is a compass that activates the magnets of curiosity, knowledge, and wisdom in the pupils.”- Ever Garrison',
    '“Education is not the filling of a pail but the lighting of a fire.”- William Butler Yeats',
    '“One looks back with appreciation to the brilliant teachers, but with gratitude to those who touched our human feelings.” – Carl Jung',
    '“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” – Malcolm X',
    '“Everyone who remembers his own education remembers teachers, not methods and techniques. The teacher is the heart of the educational system.” – Sidney Hook',
    '“The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.” – William Arthur Ward',
    '“Children are likely to live up to what you believe of them.” – Lady Bird Johnson',
    '“The object of education is to prepare the young to educate themselves throughout their lives.” – Robert M. Hutchins',
    '“The beautiful thing about learning is that no one can take it away from you.” – B.B. King',
    '“Anyone who does anything to help a child in his life is a hero to me.” –  Fred Rogers',
    '“A good teacher is like a candle — it consumes itself to light the way for others.” – Mustafa Kemal Ataturk',
    '“Give me a fish and I eat for a day. Teach me to fish and I eat for a lifetime.” – Chinese Proverb',
    '“A teacher takes a hand, opens a mind, and touches a heart.” – Unknown',
    '“Education is not preparation for life; education is life itself.” – John Dewey',
    '“Teaching is a very noble profession that shapes the character, caliber, and future of the individual. If the people remember me as a good teacher, that will be the biggest honor for me.” – APJ Abdul Kalam']

  const min = 0;
  const max = quotes.length;
  const rand = Math.round(min + Math.random() * (max - min));

  const getWish = () => {
    var today = new Date()
    var curHr = today.getHours()
  
    if (curHr < 12) {
      setWish("Good Morning")
    } else if (curHr < 18) {
      setWish("Good Afternoon")
    } else {
      setWish("Good Evening")
    }
  }

  useEffect(() => {
    setNum(rand);
    getWish();
  });



  const viewTasks = (e) => {
    e.preventDefault();
    const mail = props.mail
    const data = JSON.stringify({
      "assigned": mail
    });

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/taskassign',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var description = response.data["data"]
        var pop = response.data["populator"]
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer it={description} pop={pop} const mail = {props.mail} cTask={props.cTask}/>
          </React.StrictMode>,
          document.getElementById('dLogin'));
      })

  }

  return (
    <div class="wrapper">
      <main>
        <div class="home-page">
          <div class="block">
            <h1>Hello, {message}.</h1>
            <h5>{wish}!</h5><br />
            <p id="quote">Here's a Quote for you:</p>
            <cite class="intro">{quotes[num]}</cite><br /><br />
            <p>Let's see what's in your To-Do List Today</p>
            <a href="/" class="button" onClick={viewTasks}>View Tasks</a>
          </div>
        </div>
      </main>

    </div>
  );
}

export default HomeScreen;
