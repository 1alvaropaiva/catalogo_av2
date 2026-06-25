# Melhorias críticas

## [Alta] Fortalecer tratamento de erros de API

Problema:
As falhas de rede/servidor hoje são tratadas com mensagens genéricas em parte dos fluxos, sem classificação por tipo de erro.

Impacto:
Dificulta diagnóstico em produção e pode gerar suporte mais lento para usuários.

Esforço estimado:
Médio.

Solução sugerida:
Padronizar camada de erros no módulo de API (mapear timeout, 4xx, 5xx), registrar contexto mínimo e exibir feedback específico por cenário.

## [Alta] Cobertura de testes automatizados para fluxos críticos

Problema:
Não há garantia automatizada forte para CRUD e validações de formulário em regressões futuras.

Impacto:
Alto risco de quebrar criação/edição/exclusão sem detecção antecipada.

Esforço estimado:
Médio/Alto.

Solução sugerida:
Adicionar testes unitários para validadores e utilitários, além de testes de integração de tela para criação/edição de produto.

## [Média] Revisar duplicação e consistência de normalização

Problema:
Transformações de string/preço e saneamento podem ser repetidas em pontos diferentes.

Impacto:
Risco de divergência de comportamento entre telas e camada de API.

Esforço estimado:
Médio.

Solução sugerida:
Concentrar normalizações em utilitários únicos e reutilizar em todos os fluxos de entrada/saída.

# Melhorias de arquitetura

## [Média] Introduzir camada de serviços por caso de uso

Problema:
Parte da orquestração de fluxo fica concentrada em páginas/componentes.

Impacto:
Aumenta acoplamento entre UI e regras de orquestração.

Esforço estimado:
Médio.

Solução sugerida:
Criar serviços de aplicação (ex.: `createProduct`, `updateProduct`) para encapsular fluxo e manter páginas mais enxutas.

## [Média] Padronizar organização por domínio

Problema:
Com crescimento do projeto, estrutura por tipo técnico pode dificultar navegação.

Impacto:
Onboarding mais lento e maior custo de manutenção.

Esforço estimado:
Médio.

Solução sugerida:
Migrar gradualmente para organização por domínio/feature (produto, tema, navegação), preservando compatibilidade.

# Melhorias de performance

## [Média] Otimizar renderização de listas e callbacks

Problema:
Re-renderizações podem ocorrer além do necessário em componentes de listagem e formulário.

Impacto:
Queda de responsividade em catálogos maiores.

Esforço estimado:
Baixo/Médio.

Solução sugerida:
Aplicar memoização criteriosa (`React.memo`, `useMemo`, `useCallback`) em pontos de maior churn de estado.

## [Média] Reduzir custo de imagens em base64

Problema:
Base64 aumenta tamanho de payload e memória no cliente.

Impacto:
Tempo de envio maior e potencial degradação em conexões lentas.

Esforço estimado:
Médio.

Solução sugerida:
Adotar upload para storage externo (URL final) e limitar resolução/tamanho antes do envio.

# Melhorias de UX/UI

## [Média] Melhorar acessibilidade de formulários e ações

Problema:
Nem todos os fluxos têm feedback avançado para leitores de tela/teclado.

Impacto:
Experiência inconsistente para usuários com necessidades de acessibilidade.

Esforço estimado:
Médio.

Solução sugerida:
Reforçar atributos ARIA, foco visível, navegação por teclado e mensagens de erro associadas semanticamente aos campos.

## [Baixa] Evoluir feedback visual de estado

Problema:
Feedback de carregamento/sucesso pode ser expandido para estados mais granulares.

Impacto:
Melhora percepção de fluidez e previsibilidade.

Esforço estimado:
Baixo.

Solução sugerida:
Padronizar skeletons/toasts para operações assíncronas relevantes.

# Melhorias de segurança

## [Alta] Reforçar sanitização e validação defensiva de entrada

Problema:
Mesmo com validação no cliente, entradas maliciosas ainda podem chegar via API.

Impacto:
Risco de persistência de dados inválidos e vetores de injeção dependendo do backend.

Esforço estimado:
Médio.

Solução sugerida:
Validar e sanitizar no backend, manter contratos estritos e padronizar escape de conteúdo exibido.

## [Média] Política de variáveis de ambiente e observabilidade

Problema:
Falta de trilha clara para configuração segura por ambiente.

Impacto:
Erros de deploy e rastreabilidade limitada.

Esforço estimado:
Baixo/Médio.

Solução sugerida:
Documentar matriz de variáveis por ambiente e integrar monitoramento de falhas (Sentry ou similar).

# Melhorias de qualidade

## [Alta] Expandir estratégia de testes e qualidade contínua

Problema:
Validação de qualidade depende majoritariamente de lint/build.

Impacto:
Regressões funcionais podem passar sem detecção automática.

Esforço estimado:
Médio/Alto.

Solução sugerida:
Adicionar suíte de testes com cobertura mínima para fluxos críticos e gatilho em pipeline de CI.

## [Média] Endurecer tipagem de respostas da API

Problema:
Uso de tipos parciais em respostas pode mascarar inconsistências de contrato.

Impacto:
Erros só aparecem em runtime em cenários de payload inesperado.

Esforço estimado:
Médio.

Solução sugerida:
Introduzir validação de schema em runtime (ex.: Zod) antes de normalizar dados.

# Melhorias futuras

## [Baixa] Adicionar paginação e ordenação avançada

Problema:
Listagem pode escalar mal com muitos produtos em memória local.

Impacto:
Melhora escalabilidade funcional e experiência de uso.

Esforço estimado:
Médio.

Solução sugerida:
Implementar paginação server-side com ordenação por preço, nome, data de criação.

## [Baixa] Histórico de alterações por produto

Problema:
Não há rastreabilidade de mudanças realizadas em edição.

Impacto:
Facilita auditoria e suporte operacional.

Esforço estimado:
Alto.

Solução sugerida:
Criar trilha de auditoria com diff de campos e metadados de alteração.