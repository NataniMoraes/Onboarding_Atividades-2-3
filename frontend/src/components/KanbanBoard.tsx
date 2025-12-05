import { useState, useEffect } from 'react';

//Mantine
import { Container, Title, Loader, Text, Grid, Paper, Stack, Badge } from '@mantine/core';
import { notifications } from '@mantine/notifications';

//@hello-pangea para o dnd
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

import type { Lead, StatusLead } from '../types/Lead';
import { leadService } from '../services/leadService';

interface Coluna {
  status: StatusLead;
  titulo: string;
  cor: string;
}

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);  
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container>
        <Loader size="xl" />
        <Text>Carregando leads...</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py="md">
      
      <Title order={1} mb="lg">Leads</Title>

      <DragDropContext onDragEnd={handleDragEnd}>
        
        <Grid gutter="md">
          
          {colunas.map((coluna) => {
            
            const leadsColuna = leads.filter(lead => lead.status === coluna.status);

            return (
              <Grid.Col key={coluna.status} span={2}>
                
                <Paper shadow="sm" p="md" withBorder>

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
                                style={{
                                  ...provided.draggableProps.style,
                                  
                                  cursor: 'grab',
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
    </Container>
  );
}