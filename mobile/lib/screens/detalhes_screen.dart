import 'package:flutter/material.dart';
import '../models/lead.dart';
import '../services/LeadService.dart';

class DetalhesScreen extends StatelessWidget {
  final Lead lead;

  const DetalhesScreen({
    Key? key,
    required this.lead,
  }) : super(key: key);

  String formatarData(String dataISO) {

    try {
      final data = DateTime.parse(dataISO);
      return '${data.day.toString().padLeft(2, '0')}/${data.month.toString().padLeft(2, '0')}/${data.year} ${data.hour.toString().padLeft(2, '0')}:${data.minute.toString().padLeft(2, '0')}';
    } catch (e) {
      return dataISO;

    }
  }

  Future<void> deletarLead(BuildContext context) async {
    final confirmar = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirmar exclusão'),
          content: Text(
            'Tem certeza que deseja excluir o lead "${lead.nome}"? Esta ação não pode ser desfeita.',
          ),

          actions: [

            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false);
              },
              child: Text('Cancelar'),
            ),

            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true);
              },
              style: TextButton.styleFrom(
                foregroundColor: Colors.red,
              ),
              child: Text('Excluir'),
            ),
          ],
        );
      },
    );

    if (confirmar == true) {
      try {
        // Mostra loading
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return Center(
              child: CircularProgressIndicator(),
            );
          },
        );
        await LeadService.delete(lead.id);

        Navigator.of(context).pop();

        // Mostra SnackBar de sucesso
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lead excluído com sucesso'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.of(context).pop(true);

      } catch (error) {
        Navigator.of(context).pop();

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao excluir lead: $error'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
  IconData getIconePorStatus(String status) {
    switch (status) {
      case 'NOVO':
        return Icons.fiber_new;
      case 'CONTATO':
        return Icons.phone;
      case 'PROPOSTA':
        return Icons.description;
      case 'NEGOCIACAO':
        return Icons.handshake;
      case 'GANHO':
        return Icons.check_circle;
      case 'PERDIDO':
        return Icons.cancel;
      default:
        return Icons.label;
    }
  }

  Color getCorPorStatus(String status) {
    switch (status) {
      case 'NOVO':
        return Colors.blue;
      case 'CONTATO':
        return Colors.cyan;
      case 'PROPOSTA':
        return Colors.orange;
      case 'NEGOCIACAO':
        return Colors.amber;
      case 'GANHO':
        return Colors.green;
      case 'PERDIDO':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: Text('Detalhes do Lead'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,

        actions: [
          IconButton(
            icon: Icon(Icons.delete),
            onPressed: () => deletarLead(context),
            tooltip: 'Excluir lead',
          ),
        ],
      ),

      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Card(
              elevation: 2,

              child: Padding(
                padding: EdgeInsets.all(16),

                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [
                    Text(
                      lead.nome,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    SizedBox(height: 8),

                    Row(

                      children: [
                        Icon(
                          getIconePorStatus(lead.status),
                          color: getCorPorStatus(lead.status),
                          size: 20,
                        ),

                        SizedBox(width: 8),

                        Chip(
                          label: Text(lead.status),
                          backgroundColor: getCorPorStatus(lead.status).withOpacity(0.2),

                          labelStyle: TextStyle(
                            color: getCorPorStatus(lead.status),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            SizedBox(height: 16),

            _buildSecao(
              titulo: 'Informações de Contato',
              children: [
                _buildCampo(
                  icone: Icons.email,
                  label: 'Email',
                  valor: lead.email,
                ),

                _buildCampo(
                  icone: Icons.phone,
                  label: 'Telefone',
                  valor: lead.telefone,
                ),

                if (lead.empresa != null)
                  _buildCampo(
                    icone: Icons.business,
                    label: 'Empresa',
                    valor: lead.empresa!,
                  ),
              ],
            ),

            SizedBox(height: 16),

            if (lead.observacoes != null && lead.observacoes!.isNotEmpty)
              _buildSecao(
                titulo: 'Observações',
                children: [
                  Text(
                    lead.observacoes!,
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),

            SizedBox(height: 16),

            _buildSecao(
              titulo: 'Informações do Sistema',
              children: [
                _buildCampo(
                  icone: Icons.calendar_today,
                  label: 'Cadastrado em',
                  valor: formatarData(lead.dataCadastro),
                ),

                _buildCampo(
                  icone: Icons.update,
                  label: 'Última atualização',
                  valor: formatarData(lead.dataAtualizacao),
                ),

                _buildCampo(
                  icone: Icons.tag,
                  label: 'ID',
                  valor: lead.id.toString(),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(16),

          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
            },

            style: ElevatedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 16),
            ),

            child: Text('Voltar'),
          ),
        ),
      ),
    );
  }
  Widget _buildSecao({
    required String titulo,
    required List<Widget> children,
  }) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              titulo,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),
            Divider(),

            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildCampo({
    required IconData icone,
    required String label,
    required String valor,
  }) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),

      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icone,
            size: 20,
            color: Colors.grey[600],
          ),

          SizedBox(width: 12),

          Expanded(

            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),

                SizedBox(height: 4),

                Text(
                  valor,
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}