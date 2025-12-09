import 'package:flutter/material.dart';
import '../models/lead.dart';
import '../services/LeadService.dart';
import '../screens/detalhes_screen.dart';

class ListagemScreen extends StatefulWidget {
  @override
  State<ListagemScreen> createState() => _ListagemScreenState();
}

class _ListagemScreenState extends State<ListagemScreen> {
  List<Lead> leads = [];
  bool isLoading = true;
  @override
  void initState() {
    super.initState();
    carregarLeads();
  }
  Future<void> carregarLeads() async {
    setState(() {
      isLoading = true;
    });

    try {
      final leadsCarregados = await LeadService.getAll();

      setState(() {
        leads = leadsCarregados;
        isLoading = false;
      });

    } catch (error) {

      setState(() {
        isLoading = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro ao carregar leads: $error'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

    Map<String, List<Lead>> agruparPorStatus() {
    Map<String, List<Lead>> agrupados = {};

    for (var lead in leads) {
      if (!agrupados.containsKey(lead.status)) {
        agrupados[lead.status] = [];
      }
      agrupados[lead.status]!.add(lead);
    }

    return agrupados;
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
        title: Text('Leads'),

        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        actions: [

          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: carregarLeads,
            tooltip: 'Atualizar',
          ),
        ],
      ),

      body: isLoading

          ? Center(
        child: CircularProgressIndicator(),
      )

          : leads.isEmpty
          ? Center(
        child: Text(
          'Nenhum lead cadastrado',
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      )

          : RefreshIndicator(

        onRefresh: carregarLeads,

        child: ListView(
          padding: EdgeInsets.all(8),
          children: _buildGruposStatus(),
        ),
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print('Ir para tela de cadastro');
        },

        child: Icon(Icons.add),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
    );
  }

  List<Widget> _buildGruposStatus() {

    final agrupados = agruparPorStatus();

    return agrupados.entries.map((entry) {
      final status = entry.key;
      final leadsDoStatus = entry.value;

      return ExpansionTile(

        leading: Icon(
          getIconePorStatus(status),
          color: getCorPorStatus(status),
        ),

        title: Text(
          status,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),

        subtitle: Text('${leadsDoStatus.length} leads'),
        children: leadsDoStatus.map((lead) {

          return ListTile(
            leading: CircleAvatar(

              backgroundColor: getCorPorStatus(status),
              foregroundColor: Colors.white,

              child: Text(
                lead.nome[0].toUpperCase(),
              ),
            ),

            title: Text(
              lead.nome,
              style: TextStyle(fontWeight: FontWeight.w600),
            ),

            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,

              children: [
                if (lead.empresa != null)
                  Text(lead.empresa!),
                Text(lead.telefone),
              ],
            ),

            trailing: Icon(Icons.chevron_right),
            onTap: () async  {
              final resultado = await Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => DetalhesScreen(lead: lead),
                  ),
              );
              if (resultado == true) {
                carregarLeads();
              }
            },
          );
        }).toList(),
      );
    }).toList();
  }
}