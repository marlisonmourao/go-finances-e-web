import { Container } from "./styles";

import { Summary } from "../Summary";
import { TransactionTables } from "../TransactionTables";

export function Dashboard() {
  return(
    <Container>
      <Summary />
      <TransactionTables />
    </Container>
  )
}