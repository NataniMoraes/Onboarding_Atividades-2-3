//service
import type { Lead, StatusLead } from "../types/Lead";

const API_URL = 'http://localhost:8080/api/leads';

export const leadService = {

//GET: BUSCAR TODOS OS LEADS
    async getAll(): Promise<Lead[]>{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error('Erro ao buscar leads');
        }
        return response.json();
    },

//POST: CRIAR NOVO LEAD
    async create(lead: Omit<Lead, 'id' | 'dataCadastro' | 'dataAtualizacao'>): Promise<Lead> {
        const response = await fetch(API_URL,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        if (!response.ok){
            throw new Error ('Erro ao criar lead');            
        }        
        return response.json();
    },

//PATCH: ATUALIZAR APENAS O STATUS DO LEAD
    async updateStatus(id: number, status: StatusLead): Promise<Lead> {
        const response = await fetch(`${API_URL}/${id}/status`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status }),
        });

        if (!response.ok){
            throw new Error('Erro ao atualizar o status');
        }
        return response.json();
    },
//DELETE: DELETAR UM LEAD
    async delete (id: number): Promise<void>{
        const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
        });

        if (!response.ok) {
        throw new Error('Erro ao deletar o status');
        }
    },
};