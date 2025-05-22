export interface Ocorrencia {
    id: number;
    tipoOcorrencia: string;
    dataInicio: string;
    dataFim: string | null;
    descricaoOcorrencia: string | null;
    severidadeOcorrencia: number;
    statusOcorrencia: string;
}

export interface Relatorio {
    id: string;
    nome: string;
    razao: string;
    data: string;
    ocorrencias: Ocorrencia[];
} 