import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Iniciando chamada à API externa');
        const response = await fetch('https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
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
        
        // Validar campos obrigatórios
        if (!body.tipo_ocorrencia || !body.data_inicio || !body.severidade_ocorrencia || !body.id_estacao || !body.id_cco || !body.status_ocorrencia) {
            return NextResponse.json(
                { message: 'Campos obrigatórios ausentes.' },
                { status: 400 }
            );
        }

        // Montar o corpo exatamente como a API espera
        const dataToSend = {
            tipo_ocorrencia: body.tipo_ocorrencia,
            data_inicio: toApiDate(body.data_inicio),
            data_fim: body.data_fim ? toApiDate(body.data_fim) : null,
            severidade_ocorrencia: Number(body.severidade_ocorrencia),
            id_estacao: Number(body.id_estacao),
            id_cco: Number(body.id_cco),
            status_ocorrencia: body.status_ocorrencia,
            s3_key_evidencia: body.s3_key_evidencia ?? null,
            descricao_ocorrencia: body.descricao_ocorrencia || ''
        };

        console.log('data_inicio formatada:', toApiDate(body.data_inicio));
        console.log('Corpo enviado para API externa:', dataToSend);

        const response = await fetch('https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();
        console.log('External API response:', data);
        
        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Erro ao criar ocorrência', details: data, status: response.status },
                { status: response.status }
            );
        }
        
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
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
        
        const response = await fetch(`https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia/${id}`, {
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

function toApiDate(dateString: string): string | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    // Formato: YYYY-MM-DDTHH:mm:ss
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
