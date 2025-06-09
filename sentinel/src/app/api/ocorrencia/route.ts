import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Iniciando chamada à API externa');
        const response = await fetch('https://a3h5lirec7.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
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
        const tipoOcorrencia = body.tipo_ocorrencia;
        console.log('Tipo de ocorrência recebido:', tipoOcorrencia);
        
        if (!tipoOcorrencia || tipoOcorrencia.trim() === '') {
            console.error('tipo_ocorrencia está vazio ou undefined');
            return NextResponse.json(
                { message: 'O tipo da ocorrência é obrigatório' },
                { status: 400 }
            );
        }

        // Garantindo que data_inicio seja uma data válida
        let dataInicio = body.data_inicio;
        if (!dataInicio) {
            dataInicio = new Date().toISOString();
        }

        // Garantindo que severidade seja um número válido
        const severidade = parseInt(body.severidade);
        if (isNaN(severidade) || severidade < 1 || severidade > 3) {
            console.error('severidade inválida:', body.severidade);
            return NextResponse.json(
                { message: 'A severidade deve ser um número entre 1 e 3' },
                { status: 400 }
            );
        }
        
        // Convertendo para o formato esperado pela API
        const convertedBody = {
            TIPO_OCORRENCIA: tipoOcorrencia.trim(),
            DATA_INICIO: dataInicio.split('T')[0] + " 00:00:00", // Formato YYYY-MM-DD HH:mm:ss
            DATA_FIM: null,
            DESCRICAO_OCORRENCIA: null,
            SEVERIDADE_OCORRENCIA: severidade,
            FK_CCO_ID_CCO: parseInt(body.id_cco) || 1,
            FK_ESTACAO_ID_ESTACAO: parseInt(body.id_estacao) || 1,
            STATUS_OCORRENCIA: body.status_ocorrencia?.toUpperCase() || 'ABERTO'
        };
        
        console.log('Converted body:', convertedBody);
        console.log('Stringified body:', JSON.stringify(convertedBody));
        
        const response = await fetch('https://a3h5lirec7.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
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
        
        // Convertendo para o formato esperado pela API
        const convertedBody = {
            TIPO_OCORRENCIA: inputData.tipoOcorrencia?.trim(),
            DATA_INICIO: inputData.dataInicio ? inputData.dataInicio.split('T')[0] : new Date().toISOString().split('T')[0],
            DATA_FIM: inputData.dataFim ? inputData.dataFim.split('T')[0] : null,
            DESCRICAO_OCORRENCIA: inputData.descricaoOcorrencia,
            SEVERIDADE_OCORRENCIA: parseInt(inputData.severidadeOcorrencia),
            FK_CCO_ID_CCO: parseInt(inputData.cco?.id) || 1,
            FK_ESTACAO_ID_ESTACAO: parseInt(inputData.estacao?.id) || 1,
            STATUS_OCORRENCIA: inputData.statusOcorrencia?.toUpperCase() || 'ABERTO'
        };
        
        console.log('Converted body for PUT:', convertedBody);
        
        const response = await fetch(`https://a3h5lirec7.execute-api.sa-east-1.amazonaws.com/ocorrencia/${id}`, {
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
