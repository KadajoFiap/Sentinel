const API_BASE_URL = 'https://7njq158dja.execute-api.sa-east-1.amazonaws.com';

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface ConfirmData {
    username: string;
    code: string;
}

export interface LoginData {
    username: string;
    password: string;
}

const handleAuthError = (error: any): string => {
    if (error.message) {
        // Mapeamento de mensagens de erro comuns
        const errorMessages: { [key: string]: string } = {
            'User already exists': 'Este usuário já está cadastrado',
            'Invalid username or password': 'Usuário ou senha inválidos',
            'User is not confirmed': 'Por favor, confirme seu cadastro antes de fazer login',
            'Invalid verification code': 'Código de verificação inválido',
            'Code expired': 'O código de verificação expirou. Por favor, solicite um novo',
            'Password did not conform with policy': 'A senha não atende aos requisitos mínimos de segurança',
            'Invalid email format': 'Formato de e-mail inválido',
            'Username cannot be empty': 'O nome de usuário não pode estar vazio',
            'Password cannot be empty': 'A senha não pode estar vazia',
            'Email cannot be empty': 'O e-mail não pode estar vazio',
            'Token expired': 'Sua sessão expirou. Por favor, faça login novamente',
            'Invalid token': 'Sessão inválida. Por favor, faça login novamente',
            'User not found': 'Usuário não encontrado',
            'Too many failed attempts': 'Muitas tentativas falhas. Por favor, tente novamente mais tarde'
        };

        // Verifica se existe uma mensagem personalizada para o erro
        for (const [key, value] of Object.entries(errorMessages)) {
            if (error.message.includes(key)) {
                return value;
            }
        }
    }

    // Mensagens padrão para erros não mapeados
    if (error.status === 401) {
        return 'Sessão expirada. Por favor, faça login novamente';
    }
    if (error.status === 403) {
        return 'Acesso negado. Verifique suas credenciais';
    }
    if (error.status === 404) {
        return 'Serviço não encontrado. Por favor, tente novamente mais tarde';
    }
    if (error.status === 500) {
        return 'Erro interno do servidor. Por favor, tente novamente mais tarde';
    }

    return 'Ocorreu um erro. Por favor, tente novamente';
};

export const authService = {
    async register(data: RegisterData) {
        console.log('Tentando registrar usuário:', { ...data, password: '***' });
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            console.log('Resposta do registro:', response.status);
            
            if (!response.ok) {
                const error = await response.json();
                console.error('Erro na resposta:', error);
                throw new Error(handleAuthError(error));
            }
            
            const result = await response.json();
            console.log('Registro bem-sucedido');
            return result;
        } catch (error) {
            console.error('Erro na chamada de registro:', error);
            throw new Error(handleAuthError(error));
        }
    },

    async confirm(data: ConfirmData) {
        console.log('Tentando confirmar registro:', { ...data });
        try {
            const response = await fetch(`${API_BASE_URL}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            console.log('Resposta da confirmação:', response.status);
            
            if (!response.ok) {
                const error = await response.json();
                console.error('Erro na resposta:', error);
                throw new Error(handleAuthError(error));
            }
            
            const result = await response.json();
            console.log('Confirmação bem-sucedida');
            return result;
        } catch (error) {
            console.error('Erro na chamada de confirmação:', error);
            throw new Error(handleAuthError(error));
        }
    },

    async login(data: LoginData) {
        console.log('Tentando fazer login:', { ...data, password: '***' });
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            console.log('Resposta do login:', response.status);
            
            if (!response.ok) {
                const error = await response.json();
                console.error('Erro na resposta:', error);
                throw new Error(handleAuthError(error));
            }
            
            const result = await response.json();
            console.log('Login bem-sucedido');
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            console.error('Erro na chamada de login:', error);
            throw new Error(handleAuthError(error));
        }
    },

    async logout() {
        console.log('Tentando fazer logout');
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            console.log('Resposta do logout:', response.status);
            
            if (!response.ok) {
                const error = await response.json();
                console.error('Erro na resposta:', error);
                throw new Error(handleAuthError(error));
            }
            
            localStorage.removeItem('token');
            console.log('Logout bem-sucedido');
            return response.json();
        } catch (error) {
            console.error('Erro na chamada de logout:', error);
            throw new Error(handleAuthError(error));
        }
    },

    async isAuthenticated(): Promise<boolean> {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/validate-token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao validar token:', error);
            localStorage.removeItem('token');
            return false;
        }
    }
}; 