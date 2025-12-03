package IntegrAllTech.backend.controller;


import IntegrAllTech.backend.model.Lead;
import IntegrAllTech.backend.model.StatusLead;
import IntegrAllTech.backend.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadService service;

//POST
    @PostMapping
    public ResponseEntity<Lead> criar(@RequestBody Lead lead) {
        Lead novoLead = service.salvar(lead);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoLead);
    }
//GET
    @GetMapping
    public List<Lead> listar(){
        return service.listarTodos();
    }
//GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Lead> buscarPorID(@PathVariable Long id){
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
//PATCH
@PatchMapping("/{id}/status")
    public ResponseEntity<Lead> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String statusString = payload.get("status");

        try {
            StatusLead novoStatus = StatusLead.valueOf(statusString);
            Lead leadAtualizado = service.atualizarStatus(id, novoStatus);

            if (leadAtualizado != null) {
                return ResponseEntity.ok(leadAtualizado);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
//DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
        service.deletar(id);
        return ResponseEntity.noContent().build(); // 204 No Content
        }
     return ResponseEntity.notFound().build();
    }
}
