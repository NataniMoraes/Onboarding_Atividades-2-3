
import { Modal, Text, Stack, Badge, Button, Group } from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

import { leadService } from '../services/leadService';
import type { Lead } from '../types/Lead';

interface DetalhesLeadModalProps {
  lead: Lead | null;  
  onClose: () => void; 
  onLeadDeletado: (leadId: number) => void;
}

export function DetalhesLeadModal({ lead, onClose, onLeadDeletado }: DetalhesLeadModalProps) {
  
  async function handleDeletar() {
    if (!lead) return;

    modals.openConfirmModal({
      title: 'Confirmar exclusão',
     
      children: (
        <Text size="sm">
          Tem certeza que deseja excluir o lead <strong>{lead.nome}</strong>?
          Esta ação não pode ser desfeita.
        </Text>
      ),
      
      labels: { 
        confirm: 'Sim, excluir', 
        cancel: 'Cancelar' 
      },
      
      confirmProps: { color: 'red' },
      
      onConfirm: async () => {
        
        try {
          await leadService.delete(lead.id);

          notifications.show({
            title: 'Sucesso',
            message: 'Lead excluído com sucesso',
            color: 'green',
          });

          onLeadDeletado(lead.id);

          onClose();

        } catch (error) {
          notifications.show({
            title: 'Erro',
            message: 'Não foi possível excluir o lead',
            color: 'red',
          });
        }
      },
    });
  }

  function formatarData(dataISO: string): string {
    
    const data = new Date(dataISO);
    
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const coresStatus: Record<string, string> = {
    NOVO: 'blue',
    CONTATO: 'cyan',
    PROPOSTA: 'yellow',
    NEGOCIACAO: 'orange',
    GANHO: 'green',
    PERDIDO: 'red',
  };

  return (
    <Modal
      opened={!!lead}           
      onClose={onClose}
      title="Detalhes do Lead"            
      size="md"
    >
      {lead && (
        <Stack gap="md">
          <div>
            <Text size="xs" c="dimmed" fw={500}>Nome</Text>
            <Text size="lg" fw={700}>{lead.nome}</Text>
         
          </div>

          <div>
            <Text size="xs" c="dimmed" fw={500}>Email</Text>
            <Text>{lead.email}</Text>
          </div>

          <div>
            <Text size="xs" c="dimmed" fw={500}>Telefone</Text>
            <Text>{lead.telefone}</Text>
          </div>

          {lead.empresa && (
            <div>
              <Text size="xs" c="dimmed" fw={500}>Empresa</Text>
              <Text>{lead.empresa}</Text>
            </div>
          )}

          {lead.observacoes && (
            <div>
              <Text size="xs" c="dimmed" fw={500}>Observações</Text>
              <Text>{lead.observacoes}</Text>
            </div>
          )}

          <div>
            <Text size="xs" c="dimmed" fw={500} mb="xs">Status</Text>           
            <Badge color={coresStatus[lead.status]} size="lg">
              {lead.status}
            </Badge>
          </div>

          <div>
            <Text size="xs" c="dimmed" fw={500}>Cadastrado em</Text>
            <Text size="sm">{formatarData(lead.dataCadastro)}</Text>
          </div>

          <div>
            <Text size="xs" c="dimmed" fw={500}>Última atualização</Text>
            <Text size="sm">{formatarData(lead.dataAtualizacao)}</Text>
          </div>

          <Group grow>          
            <Button 
              variant="light"            
              onClick={onClose}
            >  Fechar
            </Button>

            <Button 
              color="red"              
              onClick={handleDeletar}            >
              Excluir
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
}