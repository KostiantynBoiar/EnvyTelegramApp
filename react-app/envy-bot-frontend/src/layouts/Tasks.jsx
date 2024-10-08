import { useEffect, useState } from 'react';
import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItemTasks from '../components/ListItemTasks';
import getUserId from '../utils/getUserId.jsx';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [text, setText] = useState("Press on the task")
  const [isTaskProcessing, setIsTaskProcessing] = useState(false);

  let tg = window.Telegram.WebApp;
  useEffect(() => {
    const fetchUserIdAndTasks = async () => {
      try {
        const id = await getUserId(tg.initDataUnsafe.user.id);
        //const id = await getUserId("506652203");
        setUserId(id);

        if (id) {
          const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/tasks/${id}/tasks`, {
            method: "GET"
          });
          const data = await response.json();

          if (Array.isArray(data)) {
            setTasks(data);
          } else {
            console.error('Unexpected data format:', data);
            setTasks([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserIdAndTasks();
  }, []);


const handleTaskClick = async (task, event) => {
    event.preventDefault(); 
    
    
    if (isTaskProcessing) return;

    setIsTaskProcessing(true);
    
    try {
      await fetch(`https://envytelegramapp.onrender.com/api/v1/users/reward/${userId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coins: task.award })
      });
  
      await fetch(`https://envytelegramapp.onrender.com/api/v1/users/${userId}/tasks/${task.id}`, {
        method: "DELETE"
      });
  
      
      setTasks((prevTasks) => prevTasks.filter(t => t.id !== task.id));
  
      
      console.log(task);
      console.log(task.description);
      window.location.href = task.description;
      
    } catch (error) {
      console.error('Error processing the task:', error);
    } finally {
      setIsTaskProcessing(false); 
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='pt-[118px] flex flex-col'>
      <h2 className='text-3xl mb-4 text-center'>ENVY</h2>
      <img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
      <Btn text={text} afterClickText={text}/>
      <ul className='flex flex-col gap-3 relative z-10'>
      {tasks.map(task => (
        <ListItemTasks
          key={task.id}
          description_link={task.description}
          name={task.title}
          plus={task.award}
          onClickEvent={(event) => handleTaskClick(task, event)}
        />
      ))}
    </ul>
    </section>
  );
};

export default Tasks;
