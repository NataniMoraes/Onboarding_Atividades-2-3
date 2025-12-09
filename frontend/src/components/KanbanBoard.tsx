import { useState, useEffect } from 'react';

//Mantine
import { Container, Title, Loader, Text, Grid, Paper, Stack, Badge, Button, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';


//@hello-pangea para o dnd
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

import type { Lead, StatusLead } from '../types/Lead';
import { leadService } from '../services/leadService';
import { CadastroLeadModal } from './CadastroLeadModal';
import { DetalhesLeadModal } from './DetalhesModal';

interface Coluna {
  status: StatusLead;
  titulo: string;
  cor: string;
}

export function KanbanBoard() {

  const [leads, setLeads] = useState<Lead[]>([]);  
  
  const [loading, setLoading] = useState(true);
  
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);

    const [leadSelecionado, setLeadSelecionado] = useState<Lead | null>(null);
    
   const colunas: Coluna[] = [
    { status: 'NOVO', titulo: '🆕 Novo', cor: 'blue' },
    { status: 'CONTATO', titulo: '📞 Contato', cor: 'cyan' },
    { status: 'PROPOSTA', titulo: '💼 Proposta', cor: 'yellow' },
    { status: 'NEGOCIACAO', titulo: '🤝 Negociação', cor: 'orange' },
    { status: 'GANHO', titulo: '✅ Ganho', cor: 'green' },
    { status: 'PERDIDO', titulo: '❌ Perdido', cor: 'red' },
  ];

  useEffect(() => {
    carregarLeads();
  }, []); 

  async function carregarLeads() {
    try {
      setLoading(true);      
      const data = await leadService.getAll();      
      setLeads(data);      
    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível carregar os leads',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }
//hello-pagea -- claude --
  async function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }

    const leadId = parseInt(draggableId.split('-')[1]);
    
    const novoStatus = destination.droppableId as StatusLead;

    try {
      await leadService.updateStatus(leadId, novoStatus);
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId 
            ? { ...lead, status: novoStatus } 
            : lead
        )
      );

      notifications.show({
        title: 'Sucesso',
        message: 'Status atualizado!',
        color: 'green',
      });

    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível atualizar o status',
        color: 'red',
      });
    }
  }

  function handleLeadCriado(novoLead:Lead){
    setLeads(prevLeads => [novoLead, ...prevLeads]);
  }

  function handleLeadDeletado(leadId: number) {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
  }

  function handleCardClick(lead: Lead) {
    setLeadSelecionado(lead);
  }



  /*if (loading) {
    return (
      <Container>
        <Loader size="sm"/>
        <Text>Carregando Leads...</Text>
      </Container>
    );
  }*/

    if (loading) {
    return (
      <Center h="100vh"> {/* Define altura total da tela */}
        <Stack align="center" gap="md"> {/* Empilha Loader e Texto */}
          <Loader size="xl" type="bars" /> {/* Aumentado para XL. Type opcional (bars, dots, oval) */}
          <Text size="lg" c="dimmed">Carregando Leads...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Container 
      size="xl" py="xl" px= "xl"
      style={{ 
        maxWidth: '1400px',
        margin: '0 auto'}}
    >
      <Stack gap="lg" mb="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 
          <Title order={1}>Leads</Title>
          
          <Button 
            onClick={() => setModalCadastroAberto(true)}           
            size="sm"          >
            + Novo Lead
          </Button>
        </div>
      </Stack> 

      <DragDropContext onDragEnd={handleDragEnd}>
        
        <Grid gutter="md" align="flex-start" >
          
          {colunas.map((coluna) => {
            
            const leadsColuna = leads.filter(lead => lead.status === coluna.status);

            return (
              <Grid.Col key={coluna.status} span={2}>
                
                <Paper shadow="sm" p="lg" withBorder h="100%">

                  <Stack gap="xs" mb="md">
                    <Text fw={700} size="sm">{coluna.titulo}</Text>
                    
                    <Badge color={coluna.cor} variant="light">
                      {leadsColuna.length} leads
                    </Badge>
                  </Stack>

                  <Droppable droppableId={coluna.status}>

                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        
                        ref={provided.innerRef}
                        
                        style={{ minHeight: '200px' }}
                      >
                        
                        {leadsColuna.map((lead, index) => (
                          
                          <Draggable
                            key={lead.id}
                            draggableId={`lead-${lead.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                
                                {...provided.draggableProps}
                                
                                {...provided.dragHandleProps}
                               
                                shadow="xs"
                                p="sm"
                                mb="sm"
                                withBorder
                                  onClick={() => handleCardClick(lead)}
                                
                                style={{
                                  ...provided.draggableProps.style,
                                  cursor: 'pointer',
                                }}

                              
                              >
                                <Stack gap="xs">
                                  <Text fw={600} size="sm">{lead.nome}</Text>
                                  
                                  {lead.empresa && (
                                    <Text size="xs" c="dimmed">{lead.empresa}</Text>
                                  )}
                                  
                                  <Text size="xs">{lead.telefone}</Text>
                                  
                                  <Badge size="xs" color={coluna.cor}>
                                    {lead.status}
                                  </Badge>
                                </Stack>
                              </Paper>
                            )}
                          </Draggable>
                        ))}
                        
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid.Col>
            );
          })}
        </Grid>
      </DragDropContext>

      <CadastroLeadModal
        opened={modalCadastroAberto}
        onClose={() => setModalCadastroAberto(false)}
        onLeadCriado={handleLeadCriado}
      />
      <DetalhesLeadModal
        lead={leadSelecionado}
        onClose={() => setLeadSelecionado(null)}
        onLeadDeletado={handleLeadDeletado}
      />

    </Container>
  );
}