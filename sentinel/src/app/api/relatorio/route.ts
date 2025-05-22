import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch all occurrences
        const response = await fetch('http://localhost:8080/ocorrencia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const ocorrencias = await response.json();

        // Group occurrences by month
        const relatoriosPorMes = ocorrencias.reduce((acc: any, ocorrencia: any) => {
            const data = new Date(ocorrencia.DATA_INICIO);
            const mesAno = `${data.toLocaleString('pt-BR', { month: 'short' })}/${data.getFullYear()}`;
            
            if (!acc[mesAno]) {
                acc[mesAno] = {
                    id: mesAno.toLowerCase().replace('/', '-'),
                    nome: mesAno,
                    razao: "0/0", // Will be updated with total occurrences
                    data: data.toLocaleDateString('pt-BR'),
                    ocorrencias: []
                };
            }
            
            acc[mesAno].ocorrencias.push(ocorrencia);
            return acc;
        }, {});

        // Calculate ratio and format data
        const relatorios = Object.values(relatoriosPorMes).map((relatorio: any) => {
            const totalOcorrencias = relatorio.ocorrencias.length;
            const ocorrenciasConcluidas = relatorio.ocorrencias.filter((oc: any) => 
                oc.STATUS_OCORRENCIA === 'Concluído'
            ).length;
            
            return {
                ...relatorio,
                razao: `${ocorrenciasConcluidas}/${totalOcorrencias}`
            };
        });

        return NextResponse.json(relatorios, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 