-- Leads na coluna NOVO
INSERT INTO lead (nome, email, telefone, empresa, status, data_cadastro, data_atualizacao)
VALUES ('Roberto da Silva', 'roberto@email.com', '11999990001', 'Tech Solutions', 'NOVO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO lead (nome, email, telefone, empresa, status, data_cadastro, data_atualizacao)
VALUES ('Ana Ferreira', 'ana@teste.com', '21988887777', 'Marketing Digital Ltda', 'NOVO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Lead na coluna CONTATO
INSERT INTO lead (nome, email, telefone, empresa, observacoes, status, data_cadastro, data_atualizacao)
VALUES ('Carlos Eduardo', 'cadu@empresa.com', '31977776666', 'Consultoria X', 'Ligou pedindo mais infos', 'CONTATO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Lead na coluna PROPOSTA
INSERT INTO lead (nome, email, telefone, empresa, status, data_cadastro, data_atualizacao)
VALUES ('Mariana Santos', 'mari@loja.com', '41966665555', 'Varejo Sul', 'PROPOSTA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Lead na coluna NEGOCIAÇÃO
INSERT INTO lead (nome, email, telefone, empresa, status, data_cadastro, data_atualizacao)
VALUES ('Grupo Big', 'compras@big.com.br', '1133334444', 'Grupo Big S.A.', 'NEGOCIACAO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Lead na coluna GANHO (Venda Fechada)
INSERT INTO lead (nome, email, telefone, empresa, observacoes, status, data_cadastro, data_atualizacao)
VALUES ('Patricia Lima', 'pati@start.up', '11955554444', 'Startup Y', 'Contrato assinado', 'GANHO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);