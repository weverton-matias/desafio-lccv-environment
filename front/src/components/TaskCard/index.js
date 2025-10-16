import {useMemo} from 'react';
import { format } from 'date-fns';
import * as S from './styles';

import typeIcons from '../../utils/typeIcons';

function TaskCard({type, title, event_time, done }) {
  const date = useMemo(() => format(new Date(event_time), 'dd/MM/yyyy'), [event_time]);
  const hour = useMemo(() => format(new Date(event_time), 'HH:mm'), [event_time]);

  return (
    <S.Container $done={done}>
      <S.TopCard>
        <img src={typeIcons[type]} alt="Icone da Tarefa"/>
        <h3>{title}</h3>
      </S.TopCard>
      <S.BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.BottomCard>
    </S.Container>
  )
}

export default TaskCard;
