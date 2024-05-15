import * as SQLite from 'expo-sqlite';

// Abra o banco de dados (ou crie se não existir)
const db = await SQLite.openDatabaseAsync('conectacliente.db');

// Verificar e criar o banco de dados se não existir
const verificarBancoDeDados = () => {
  db.transaction(tx => {
    // Verificar se a tabela CLIENTE existe
    tx.executeSql(
      'SELECT name FROM sqlite_master WHERE type="table" AND name="CLIENTE"',
      [],
      (_, { rows }) => {
        // Se a tabela CLIENTE não existe, criar todas as tabelas
        if (rows.length === 0) {
          criarTabelas();
        }
      },
      (_, error) => console.error('Erro ao verificar banco de dados:', error)
    );
  });
};

// Função para criar todas as tabelas
const criarTabelas = () => {
  db.transaction(tx => {
    // Criar tabela RESPONSAVEL
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS RESPONSAVEL (id_responsavel INTEGER PRIMARY KEY AUTOINCREMENT, nome_gerente TEXT NOT NULL, cpf_gerente TEXT NOT NULL, nome_comprador TEXT NOT NULL, cpf_comprador TEXT NOT NULL)',
      [],
      () => console.log('Tabela RESPONSAVEL criada com sucesso.'),
      (_, error) => console.error('Erro ao criar tabela RESPONSAVEL:', error)
    );

    // Criar tabela INFO_BANCARIA
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS INFO_BANCARIA (id_info_bancaria INTEGER PRIMARY KEY AUTOINCREMENT, nome_banco TEXT NOT NULL, numero_conta TEXT NOT NULL, agencia TEXT NOT NULL)',
      [],
      () => console.log('Tabela INFO_BANCARIA criada com sucesso.'),
      (_, error) => console.error('Erro ao criar tabela INFO_BANCARIA:', error)
    );

    // Criar tabela CLIENTE
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS CLIENTE (id_cliente INTEGER PRIMARY KEY AUTOINCREMENT, razao_social TEXT NOT NULL, cnpj TEXT NOT NULL, nome_fantasia TEXT NOT NULL, tipo_empresa TEXT NOT NULL, data_fundacao TEXT NOT NULL, predio_proprio INTEGER NOT NULL, aluguel REAL, id_responsavel INTEGER NOT NULL, id_info_bancaria INTEGER NOT NULL, FOREIGN KEY (id_responsavel) REFERENCES RESPONSAVEL(id_responsavel), FOREIGN KEY (id_info_bancaria) REFERENCES INFO_BANCARIA(id_info_bancaria))',
      [],
      () => console.log('Tabela CLIENTE criada com sucesso.'),
      (_, error) => console.error('Erro ao criar tabela CLIENTE:', error)
    );

    // Criar tabela CONTATO
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS CONTATO (id_contato INTEGER PRIMARY KEY AUTOINCREMENT, telefone TEXT NOT NULL, email_comercial TEXT NOT NULL, email_financeiro TEXT NOT NULL, email_NFE TEXT NOT NULL, endereco TEXT NOT NULL, id_cliente INTEGER NOT NULL, FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente))',
      [],
      () => console.log('Tabela CONTATO criada com sucesso.'),
      (_, error) => console.error('Erro ao criar tabela CONTATO:', error)
    );

    // Criar tabela SOCIO
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS SOCIO (id_socio INTEGER PRIMARY KEY AUTOINCREMENT, nome_socio TEXT NOT NULL, cpf_socio TEXT NOT NULL, id_cliente INTEGER NOT NULL, FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente))',
      [],
      () => console.log('Tabela SOCIO criada com sucesso.'),
      (_, error) => console.error('Erro ao criar tabela SOCIO:', error)
    );
  });
};

// Verificar e criar o banco de dados se não existir
verificarBancoDeDados();

// Função para cadastrar um cliente
const cadastrarCliente = (clienteData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Inserir dados do cliente
      tx.executeSql(
        'INSERT INTO CLIENTE (razao_social, cnpj, nome_fantasia, tipo_empresa, data_fundacao, predio_proprio, aluguel) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          clienteData.razao_social,
          clienteData.cnpj,
          clienteData.nome_fantasia,
          clienteData.tipo_empresa,
          clienteData.data_inicio_atividade,
          clienteData.predio_proprio,
          clienteData.aluguel,
        ],
        (_, resultSet) => {
          const clienteId = resultSet.insertId; // Obtém o ID do cliente inserido

          // Inserir dados de contato
          tx.executeSql(
            'INSERT INTO CONTATO (telefone, email_comercial, email_financeiro, email_NFE, endereco, id_cliente) VALUES (?, ?, ?, ?, ?, ?)',
            [
              clienteData.ddd_telefone_1,
              clienteData.email_comercial,
              clienteData.email_financeiro,
              clienteData.email_nfe,
              `${clienteData.descricao_tipo_de_logradouro} ${clienteData.logradouro}, ${clienteData.numero}, ${clienteData.bairro}, ${clienteData.municipio}, ${clienteData.uf} - CEP: ${clienteData.cep}`,
              clienteId, // Usando o ID do cliente inserido como chave estrangeira
            ],
            (_, resultSet) => {
              // Inserir dados dos responsáveis
              tx.executeSql(
                'INSERT INTO RESPONSAVEL (nome_gerente, cpf_gerente, nome_comprador, cpf_comprador) VALUES (?, ?, ?, ?)',
                [
                  clienteData.nome_gerente,
                  clienteData.cpf_gerente,
                  clienteData.nome_comprador,
                  clienteData.cpf_comprador,
                ],
                (_, resultSet) => {
                  const responsavelId = resultSet.insertId; // Obtém o ID do responsável inserido

                  // Inserir dados dos sócios
                  clienteData.qsa.forEach((socio) => {
                    tx.executeSql(
                      'INSERT INTO SOCIO (nome_socio, doc_socio, id_cliente) VALUES (?, ?, ?)',
                      [socio.nome_socio, socio.cnpj_cpf_do_socio, clienteId],
                      (_, resultSet) => {},
                      (_, error) => {
                        reject(error);
                      }
                    );
                  });

                  resolve(resultSet);
                },
                (_, error) => {
                  reject(error);
                }
              );
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
