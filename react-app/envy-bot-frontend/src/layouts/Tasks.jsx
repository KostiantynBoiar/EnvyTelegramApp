import { useEffect, useState } from 'react';
import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItemTasks from '../components/ListItemTasks';
import getUserId from '../utils/getUserId.jsx';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
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
    event.preventDefault(); // Prevent default anchor behavior
    try {
      // Award the user
      await fetch(`https://envytelegramapp.onrender.com/api/v1/users/reward/${userId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coins: task.award })
      });
  
      // Delete the task
      await fetch(`https://envytelegramapp.onrender.com/api/v1/users/${userId}/tasks/${task.id}`, {
        method: "DELETE"
      });
  
      // Update the tasks list in the state
      setTasks((prevTasks) => prevTasks.filter(t => t.id !== task.id));
  
      // Redirect the user to the description link
      console.log(task)
      console.log(task.description)
      window.location.href = task.description;
    } catch (error) {
      console.error('Error processing the task:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='pt-[118px] flex flex-col'>
      <h2 className='text-3xl mb-4 text-center'>ENVY</h2>
      <img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
      <Btn text='Claim reward' />
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
