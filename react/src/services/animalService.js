// src/services/animalService.js

// Ajuste a URL base conforme o seu ambiente (ex: IP da máquina no Expo ou localhost no Web)
const API_URL = 'http://localhost:3000/api';

/**
 * Auxiliar para recuperar o token de autenticação.
 * Ajuste para AsyncStorage.getItem('token') se estiver no React Native.
 */
const obterToken = () => {
    return sessionStorage.getItem('@nima_token');
};

export const animalService = {
    // RF11: Cadastrar um novo animal (Restrito a ONG / Admin)
    async cadastrar(dadosAnimal) {
        const token = obterToken();
        const resposta = await fetch(`${API_URL}/animais`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAnimal)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao cadastrar o animal.');
        }

        return await resposta.json();
    },

    // RF06 / RF20: Listar todos os animais (Feed / Mapa)
    async listarTodos() {
        const token = obterToken();
        const resposta = await fetch(`${API_URL}/animais`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao listar animais.');
        }

        return await resposta.json();
    },

    // RF14: Buscar a ficha de um animal específico por ID (Útil para a Smart Tag também)
    async buscarPorId(id) {
        const resposta = await fetch(`${API_URL}/animais/${id}`, {
            method: 'GET'
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Animal não encontrado.');
        }

        return await resposta.json();
    },

    // RF12: Atualizar o prontuário de vacinas do pet (Restrito a ONG / Admin)
    async atualizarVacinas(id, historicoVacinas) {
        const token = obterToken();
        const resposta = await fetch(`${API_URL}/animais/${id}/vacinas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ prontuario_vacinas: historicoVacinas })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao atualizar prontuário vacinal.');
        }

        return await resposta.json();
    },

    // RF13: Vincular o ID de uma Smart Tag física ao pet
    async vincularSmartTag(id, smartTagId) {
        const token = obterToken();
        const resposta = await fetch(`${API_URL}/animais/${id}/vincular-tag`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ smart_tag_id: smartTagId })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao vincular Smart Tag.');
        }

        return await resposta.json();
    },

    // RF10 / RF15: Alterar status de posse/situação (Disponível, Adotado, Desaparecido)
    async atualizarStatus(id, novoStatus) {
        const token = obterToken();
        const resposta = await fetch(`${API_URL}/animais/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status_posse: novoStatus })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao atualizar status do animal.');
        }

        return await resposta.json();
    }
};