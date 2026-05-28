export const OBJECTIVE_OPTIONS = [
  { value: 'reconhecimento', label: 'Reconhecimento' },
  { value: 'trafego', label: 'Tráfego' },
  { value: 'engajamento', label: 'Engajamento' },
  { value: 'leads', label: 'Leads' },
  { value: 'vendas', label: 'Vendas' },
]

export const STATUS_OPTIONS = [
  { value: 'rascunho', label: 'Rascunho' },
  { value: 'aguardando_material', label: 'Aguardando Material' },
  { value: 'em_revisao', label: 'Em Revisão' },
  { value: 'ativa', label: 'Ativa' },
  { value: 'pausada', label: 'Pausada' },
  { value: 'encerrada', label: 'Encerrada' },
]

export const STATUS_COLORS = {
  rascunho: 'bg-gray-100 text-gray-700',
  aguardando_material: 'bg-yellow-100 text-yellow-800',
  em_revisao: 'bg-blue-100 text-blue-800',
  ativa: 'bg-green-100 text-green-800',
  pausada: 'bg-orange-100 text-orange-800',
  encerrada: 'bg-red-100 text-red-700',
}

export const BUDGET_TYPE_OPTIONS = [
  { value: 'diario', label: 'Diário' },
  { value: 'total', label: 'Total' },
]

export const CTA_OPTIONS = [
  'Saiba Mais',
  'Comprar Agora',
  'Cadastre-se',
  'Fale Conosco',
  'Baixar',
  'Solicitar Orçamento',
  'Ver Oferta',
  'Acessar Site',
]

export function createDefaultChecklistCliente() {
  return [
    'URL de destino enviada e funcionando',
    'Criativos nos tamanhos corretos (1:1, 9:16, 1.91:1)',
    'Copy do anúncio aprovada pelo cliente',
    'Headline e descrição definidas',
    'Orçamento diário ou total confirmado',
    'Período de veiculação definido (início e fim)',
    'Público-alvo alinhado',
    'CTA escolhido',
  ].map(label => ({ id: crypto.randomUUID(), label, checked: false }))
}

export function createDefaultChecklistPreLancamento() {
  return [
    'Pixel instalado e disparando na página de destino',
    'UTMs configuradas corretamente na URL',
    'URL testada (link funcionando, sem 404)',
    'Criativos dentro das especificações de tamanho do Meta',
    'Textos dentro do limite de caracteres',
    'Nenhum criativo com mais de 20% de texto na imagem',
    'Conta de anúncios sem restrição de pagamento',
    'Limite de gasto configurado (se necessário)',
    'Evento de conversão correto selecionado',
    'Campanha revisada em modo Preview antes de publicar',
  ].map(label => ({ id: crypto.randomUUID(), label, checked: false }))
}

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50 MB
