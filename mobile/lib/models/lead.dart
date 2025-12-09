class Lead{
  final int id;
  final String nome;
  final String email;
  final String telefone;
  final String? empresa;
  final String? observacoes;
  final String status;
  final String dataCadastro;
  final String dataAtualizacao;

//costrutor
  Lead({
    required this.id,
    required this.nome,
    required this.email,
    required this.telefone,
    this.empresa,
    this.observacoes,
    required this.status,
    required this.dataCadastro,
    required this.dataAtualizacao,
  });

factory Lead.fromJson(Map<String, dynamic> json) {
  return Lead(
    id: json['id'],
    nome: json['nome'],
    email: json['email'],
    telefone: json['telefone'],
    empresa: json['empresa'],
    observacoes: json['observacoes'],
    status: json['status'],
    dataCadastro: json['dataCadastro'],
    dataAtualizacao: json['dataAtualizacao'],
  );
}
  Map<String, dynamic> toJson() {
    return {
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'empresa': empresa,
      'observacoes': observacoes,
      'status': status,
    };
  }
}
