// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { NextResponse } from 'next/server';

export async function GET() {
    const start = '2025-06-01T00:00:00';
    const end = '2025-06-30T23:59:59';

    const stats = await fetchOcorrenciaStats(start, end);

    return NextResponse.json([
        {
            id: '1',
            nome: 'Relatório Teste',
            razao: 'Teste',
            data: start,
            ocorrencias: [
                {
                    id: 1,
                    tipoOcorrencia: 'Teste',
                    dataInicio: start,
                    dataFim: end,
                    descricaoOcorrencia: 'Ocorrência de teste',
                    severidadeOcorrencia: 1,
                    statusOcorrencia: 'Aberta'
                }
            ],
            status: {
                start,
                end
            },
            stats
        }
    ]);
}

async function fetchOcorrenciaStats(start: string, end: string) {
    const res = await fetch(
        `https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia/stats?start=${start}&end=${end}`,
        { headers: { 'Content-Type': 'application/json' } }
    );
    if (!res.ok) throw new Error('Erro ao buscar estatísticas');
    return res.json();
}