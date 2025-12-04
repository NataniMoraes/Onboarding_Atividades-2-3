export type StatusLead = 'NOVO' | 'CONTATO' | 'PROPOSTA' | 'NEGOCIACAO' | 'GANHO' | 'PERDIDO';

export interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  observacoes?: string;
  status: StatusLead;
  dataCadastro: string;
  dataAtualizacao: string;
}