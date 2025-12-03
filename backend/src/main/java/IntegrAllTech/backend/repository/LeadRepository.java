package IntegrAllTech.backend.repository;

import IntegrAllTech.backend.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository  extends JpaRepository<Lead, Long> {
}
