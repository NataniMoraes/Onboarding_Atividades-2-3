package IntegrAllTech.backend.service;

import IntegrAllTech.backend.model.Lead;
import IntegrAllTech.backend.model.StatusLead;
import IntegrAllTech.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    @Autowired
    private LeadRepository repository;

//CRIAR NOVO LEAD
    public Lead salvar(Lead lead){
        if (lead.getId() == null){
            lead.setStatus(StatusLead.NOVO);
        }
        return repository.save(lead);
    }

//LISTAR TODOS OS LEADS
    public List<Lead> listarTodos(){
        return repository.findAll();
    }

//BUSCAR LEAD POR ID
    public Optional<Lead> buscarPorId(Long id){
        return repository.findById(id);
    }

//ATUALIZAR STATUS DOS LEADS
    public Lead atualizarStatus(Long id, StatusLead novoStatus){
        return repository.findById(id)
                .map(lead -> {
            lead.setStatus(novoStatus);
            lead.setDataAtualizacao(java.time.LocalDateTime.now());
            return repository.save(lead);
        }).orElse(null);
    }

//DELETAR
    public void deletar(Long id){
        repository.deleteById(id);
    }
}
