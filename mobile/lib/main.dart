import 'package:flutter/material.dart';
import 'screens/listagem_screen.dart';
import 'screens/detalhes_screen.dart';

void main() {
  runApp(MeuApp());
}

class MeuApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(

      title: 'Leads',

      theme: ThemeData(

        primarySwatch: Colors.blueGrey,

        useMaterial3: true,
      ),

      debugShowCheckedModeBanner: false,

      home: ListagemScreen(),
    );
  }
}