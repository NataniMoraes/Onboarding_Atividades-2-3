import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/lead.dart';

class LeadService {
  static const String baseUrl = 'http://10.0.2.2:8080/api/leads';
  static Future<List<Lead>> getAll() async {
    try {
      final response = await http.get(Uri.parse(baseUrl));
      if (response.statusCode == 200) {
        List<dynamic> body = jsonDecode(response.body);
        List<Lead> leads = body.map((json) => Lead.fromJson(json)).toList();
        return leads;
      } else {
        throw Exception('Erro ao buscar leads: ${response.statusCode}');
      }
    } catch (error) {
      print('Erro em getAll: $error');
      throw Exception('Erro ao buscar leads: $error');
    }
  }
  static Future<Lead> create(Lead lead) async {
    try {
      Map<String, dynamic> body = lead.toJson();
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(body),
      );
      if (response.statusCode == 201 || response.statusCode == 200) {
        Map<String, dynamic> json = jsonDecode(response.body);
        return Lead.fromJson(json);
      } else {
        throw Exception('Erro ao criar lead: ${response.statusCode}');
      }

    } catch (error) {
      print('Erro em create: $error');
      throw Exception('Erro ao criar lead: $error');
    }
  }

  static Future<void> delete(int id) async {

    try {
      final response = await http.delete(Uri.parse('$baseUrl/$id'));
      if (response.statusCode == 200 || response.statusCode == 204) {
        return;
      } else {
        throw Exception('Erro ao deletar lead: ${response.statusCode}');
      }

    } catch (error) {
      print('Erro em delete: $error');
      throw Exception('Erro ao deletar lead: $error');
    }
  }
}