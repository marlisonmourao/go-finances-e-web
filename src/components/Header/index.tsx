import { Container, Content } from './styles';

import LogoSvg from '../../assets/logoSvg.svg';

interface HeaderProps {
  onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return(
    <Container>
      <Content>
        <img src={LogoSvg} alt="goFiances" />
        <button type='button' onClick={onOpenNewTransactionModal}> 
          Nova Transação
        </button>
      </Content>
    </Container>
  )
}