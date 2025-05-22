import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Iniciando chamada à API externa');
        const response = await fetch('https://java-sentinel-api.onrender.com/ocorrencia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Erro na resposta da API:', response.status, response.statusText);
            return NextResponse.json(
                { message: `API error: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('Dados recebidos da API externa:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Request body received:', body);
        
        // Garantindo que tipo_ocorrencia não seja undefined ou vazio
        const tipoOcorrencia = body.tipoOcorrencia;
        console.log('Tipo de ocorrência recebido:', tipoOcorrencia);
        
        if (!tipoOcorrencia || tipoOcorrencia.trim() === '') {
            console.error('tipoOcorrencia está vazio ou undefined');
            return NextResponse.json(
                { message: 'O tipo da ocorrência é obrigatório' },
                { status: 400 }
            );
        }

        // Garantindo que data_inicio seja uma data válida
        let dataInicio = body.dataInicio;
        if (!dataInicio) {
            dataInicio = new Date().toISOString();
        }

        // Garantindo que severidade seja um número válido
        const severidade = parseInt(body.severidadeOcorrencia);
        if (isNaN(severidade) || severidade < 1 || severidade > 3) {
            console.error('severidadeOcorrencia inválida:', body.severidadeOcorrencia);
            return NextResponse.json(
                { message: 'A severidade deve ser um número entre 1 e 3' },
                { status: 400 }
            );
        }
        
        // Convertendo para o formato esperado pela API Java
        const convertedBody = {
            tipoOcorrencia: tipoOcorrencia.trim(),
            dataInicio: dataInicio.split('T')[0], // Formato YYYY-MM-DD
            dataFim: body.dataFim ? body.dataFim.split('T')[0] : null,
            descricaoOcorrencia: body.descricaoOcorrencia || null,
            severidadeOcorrencia: severidade,
            cco: {
                id: parseInt(body.cco?.id) || 1
            },
            estacao: {
                id: parseInt(body.estacao?.id) || 1
            },
            statusOcorrencia: body.statusOcorrencia?.toUpperCase() || 'ABERTO'
        };
        
        console.log('Converted body:', convertedBody);
        console.log('Stringified body:', JSON.stringify(convertedBody));
        
        const response = await fetch('https://java-sentinel-api.onrender.com/ocorrencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(convertedBody),
        });

        const data = await response.json();
        console.log('External API response:', data);
        
        if (!response.ok) {
            console.error('External API error:', {
                status: response.status,
                statusText: response.statusText,
                data: data
            });
            return NextResponse.json(
                { 
                    message: data.message || 'Erro ao criar ocorrência',
                    details: data,
                    status: response.status
                },
                { status: response.status }
            );
        }
        
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { 
                message: 'Internal server error', 
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...inputData } = body;
        
        // Convertendo para o formato esperado pela API Java
        const convertedBody = {
            tipoOcorrencia: inputData.tipoOcorrencia?.trim(),
            dataInicio: inputData.dataInicio ? inputData.dataInicio.split('T')[0] : new Date().toISOString().split('T')[0],
            dataFim: inputData.dataFim ? inputData.dataFim.split('T')[0] : null,
            descricaoOcorrencia: inputData.descricaoOcorrencia,
            severidadeOcorrencia: parseInt(inputData.severidadeOcorrencia),
            cco: {
                id: parseInt(inputData.cco?.id) || 1
            },
            estacao: {
                id: parseInt(inputData.estacao?.id) || 1
            },
            statusOcorrencia: inputData.statusOcorrencia?.toUpperCase() || 'ABERTO'
        };
        
        console.log('Converted body for PUT:', convertedBody);
        
        const response = await fetch(`https://java-sentinel-api.onrender.com/ocorrencia/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(convertedBody),
        });

        const responseData = await response.json();
        console.log('External API response:', responseData);
        
        if (!response.ok) {
            console.error('External API error:', {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            });
            return NextResponse.json(
                { 
                    message: responseData.message || 'Erro ao atualizar ocorrência',
                    details: responseData,
                    status: response.status
                },
                { status: response.status }
            );
        }
        
        return NextResponse.json(responseData, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { 
                message: 'Internal server error', 
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
