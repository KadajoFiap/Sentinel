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
                throw new Error(error.message || 'Erro ao registrar usuário');
            }
            
            const result = await response.json();
            console.log('Registro bem-sucedido');
            return result;
        } catch (error) {
            console.error('Erro na chamada de registro:', error);
            throw error;
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
                throw new Error(error.message || 'Erro ao confirmar registro');
            }
            
            const result = await response.json();
            console.log('Confirmação bem-sucedida');
            return result;
        } catch (error) {
            console.error('Erro na chamada de confirmação:', error);
            throw error;
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
                throw new Error(error.message || 'Erro ao fazer login');
            }
            
            const result = await response.json();
            console.log('Login bem-sucedido');
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            console.error('Erro na chamada de login:', error);
            throw error;
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
                throw new Error(error.message || 'Erro ao fazer logout');
            }
            
            localStorage.removeItem('token');
            console.log('Logout bem-sucedido');
            return response.json();
        } catch (error) {
            console.error('Erro na chamada de logout:', error);
            throw error;
        }
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}; 