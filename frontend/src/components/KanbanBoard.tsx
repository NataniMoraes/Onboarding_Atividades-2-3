import { useState, useEffect } from 'react';

// MANTINE
import { Container, Title, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import type { Lead } from '../types/Lead';
import { leadService } from '../services/leadService';

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  const [loading, setLoading] = useState(true);

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

   if (loading) {
    return (
      <Container>
        <Loader size="xl" /> {/* Spinner animado do Mantine */}
        <Text>Carregando leads...</Text>
      </Container>
    );
  }
  
  return (
    <Container size="xl">
      <Title order={1} mb="md">Kanban de Leads</Title>      
      <Text>Total de leads: {leads.length}</Text>      
      {/* colunas */}
    </Container>
  );
}