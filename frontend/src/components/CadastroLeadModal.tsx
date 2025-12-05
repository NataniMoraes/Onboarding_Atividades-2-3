import { Modal, TextInput, Textarea, Button, Stack } from '@mantine/core';

import { useForm } from '@mantine/form';

import { notifications } from '@mantine/notifications';
import { leadService } from '../services/leadService';
import type { Lead } from '../types/Lead';

interface CadastroLeadModalProps {
  opened: boolean; 
  onClose: () => void; 
  onLeadCriado: (lead: Lead) => void;
}

export function CadastroLeadModal({ opened, onClose, onLeadCriado }: CadastroLeadModalProps) {
  
  const form = useForm({
    initialValues: {
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      observacoes: '',
    },

    validate: {
      nome: (value) => {
        
        if (!value) {
          return 'Nome é obrigatório';
        }
        if (value.length < 3) {
          return 'Nome deve ter no mínimo 3 caracteres';
        }
        return null;
      },

      email: (value) => {
        if (!value) {
          return 'Email é obrigatório';
        }        
        if (!/^\S+@\S+\.\S+$/.test(value)) { // Regex para validar email - teste de @
          return 'Email inválido';
        }
        return null;
      },

      telefone: (value) => {
        if (!value) {
          return 'Telefone é obrigatório';
        }
        return null;
      },
    },
  });

  async function handleSubmit(values: typeof form.values) {
    
    try {
      const novoLead = await leadService.create({
        ...values, 
        status: 'NOVO',  
      });

      notifications.show({
        title: 'Sucesso!',
        message: 'Lead cadastrado com sucesso',
        color: 'green',
      });

      onLeadCriado(novoLead);

      form.reset();

      onClose();

    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível cadastrar o lead',
        color: 'red',
      });
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Cadastrar Novo Lead"
      size="lg" 
      centered      
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        
        <Stack gap="md">

          <TextInput
            label="Nome"
            
            placeholder="Digite o nome do lead"
            
            required            
            {...form.getInputProps('nome')}
  
          />

          <TextInput
            label="Email"
            placeholder="exemplo@email.com"
            type="email"
            required
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Telefone"
            placeholder="(00) 00000-0000"
            required
            {...form.getInputProps('telefone')}
          />

          <TextInput
            label="Empresa"
            placeholder="Nome da empresa"
            {...form.getInputProps('empresa')}
          />

          <Textarea
            label="Observações"
            placeholder="Informações adicionais..."
            minRows={3}
            {...form.getInputProps('observacoes')}
          />

          <Stack gap="sm">
            <Button 
              type="submit"
              fullWidth
            >
              Salvar
            </Button>

            <Button 
              variant="light"
              color="gray"              
              fullWidth              
              onClick={onClose}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
}