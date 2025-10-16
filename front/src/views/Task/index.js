// src/views/Task/index.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';
import { format } from 'date-fns';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  useEffect(() => {
    if (!id) return; // Contornar 2 requisições
    async function loadTaskDetails() {
      try {
        const response = await api.get(`/tasks/${id}`);
        const task = response.data;

        setType(task.type);
        setDone(task.done);
        setTitle(task.title);
        setDescription(task.description);
        setDate(format(new Date(task.event_time), 'yyyy-MM-dd'));
        setHour(format(new Date(task.event_time), 'HH:mm'));
      } catch (err) {
        console.error('Erro ao carregar tarefa:', err);
      }
    }

    loadTaskDetails();
  }, [id]);

  async function handleSave() {
    if (!title) return alert('Você precisa informar o título da tarefa');
    if (!description) return alert('Você precisa informar a descrição da tarefa');
    if (!type) return alert('Você precisa selecionar o tipo da tarefa');
    if (!date) return alert('Você precisa definir a data da tarefa');
    if (!hour) return alert('Você precisa definir a hora da tarefa');

    const event_time = new Date(`${date}T${hour}:00`).toISOString();

    try {
      if (id) {
        await api.put(`/tasks/${id}`, {
          done,
          type,
          title,
          description,
          event_time,
        });
      } else {
        await api.post('/tasks', {
          type,
          title,
          description,
          event_time,
          done,
        });
      }

      navigate('/'); // substitui o Redirect
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
      alert('Erro ao salvar tarefa');
    }
  }

  async function handleRemove() {
    if (!id) return;
    const confirmDelete = window.confirm('Deseja realmente remover a tarefa?');
    if (confirmDelete) {
      try {
        await api.delete(`/tasks/${id}`);
        navigate('/');
      } catch (err) {
        console.error('Erro ao remover tarefa:', err);
      }
    }
  }

  return (
    <S.Container>
      <Header />

      <S.Form>
        <S.Container>
          <h2 className='title'>Tipo da tarefa</h2>
        </S.Container>
        <S.TypeIcons>
          <button type="button" onClick={() => setType('WORK')}>
            <img
              src={TypeIcons.WORK}
              alt="Trabalho"
              className={type !== 'WORK' ? 'inative' : ''}
            />
          </button>

          <button type="button" onClick={() => setType('SCHOOL')}>
            <img
              src={TypeIcons.SCHOOL}
              alt="Estudos"
              className={type !== 'SCHOOL' ? 'inative' : ''}
            />
          </button>

          <button type="button" onClick={() => setType('PERSONAL')}>
            <img
              src={TypeIcons.PERSONAL}
              alt="Pessoal"
              className={type !== 'PERSONAL' ? 'inative' : ''}
            />
          </button>
        </S.TypeIcons>

        <S.Input>
          <span>Título</span>
          <input
            type="text"
            placeholder="Título da tarefa..."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Detalhes da tarefa..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input
            type="date"
            onChange={e => setDate(e.target.value)}
            value={date}
          />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            onChange={e => setHour(e.target.value)}
            value={hour}
          />
        </S.Input>

        <S.Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUÍDO</span>
          </div>
          {id && <button type="button" onClick={handleRemove}>EXCLUIR</button>}
        </S.Options>

        <S.Save>
          <button className="btn-salvar" type="button" onClick={handleSave}>SALVAR</button>
        </S.Save>
      </S.Form>

      <Footer />
    </S.Container>
  );
}

export default Task;
