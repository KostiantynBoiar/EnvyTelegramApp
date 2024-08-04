import { useEffect, useState } from 'react';
import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';
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
        //const id = await getUserId("koreechdhs");
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

  console.log("Your tasks: ", tasks);

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
          <ListItem
            key={task.id}
            name={task.title}
            plus={task.award}
          />
        ))}
      </ul>
    </section>
  );
};

export default Tasks;
