import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

import * as S from './style';

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    async function loadTasks() {
      try {
        const endpoint = filterActived === 'all'
          ? '/tasks'
          : `/tasks/filter/${filterActived}`;
        
        const response = await api.get(endpoint);
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    loadTasks();
  },
    [filterActived]
  );
  
  return (
    <S.Container>
      <Header />
      <S.FilterArea>
        <button type='button' onClick={() => setFilterActived("all")}>
          <FilterCard title="Todos"   actived={filterActived === 'all'}/>
        </button>
        <button type='button' onClick={() => setFilterActived("today")}>
          <FilterCard title="Hoje" actived={filterActived === 'today'}/>
        </button>
        <button type='button' onClick={() => setFilterActived("week")}>
          <FilterCard title="Semana"  actived={filterActived === 'week'}/>
        </button>
        <button type='button' onClick={() => setFilterActived("month")}>
          <FilterCard title="Mês"     actived={filterActived === 'month'}/>
        </button>
        <button type='button' onClick={() => setFilterActived("year")}>
          <FilterCard title="Ano"     actived={filterActived === 'year'} />
        </button>
      </S.FilterArea>
      
      <S.Content>
        {
          tasks.map(task => (
            <Link key={task.id} to={`/task/${task.id}`}>
              <TaskCard type={task.type} title={task.title} event_time={task.event_time} done={task.done} />    
            </Link>
          ))  
        }
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default Home;
