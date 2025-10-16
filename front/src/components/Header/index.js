import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import * as S from './styles';

function Header() {
  return (
    <S.Container>
        <S.LeftSide>
            <img src={logo} alt="Logo do site" />
        </S.LeftSide>
        <S.RigthSide>
          <Link to="/">Início</Link>
          <span className="divider" />
          <Link to="/task">Nova Tarefa</Link>
        </S.RigthSide>
    </S.Container>
  )
}

export default Header;
