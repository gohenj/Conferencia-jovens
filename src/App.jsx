import  { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ⚠️ COLOQUE SUAS CHAVES DO SUPABASE AQUI ⚠️
const supabaseUrl = 'https://nbswjlupppitnpywtoip.supabase.co';
const supabaseKey = 'sb_publishable_3-F_GVA2274jWbeMek8nuQ_POcsEjEd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', congregacao: '' });

  // ⚠️ COLOQUE O LINK DO GRUPO DO WHATSAPP AQUI ⚠️
  const LINK_WHATSAPP = "https://chat.whatsapp.com/EafbP8aRz1K0DjQigJLN8B";

  // Função que cria a máscara do WhatsApp (XX) 9XXXX-XXXX
  const handleMascaraTelefone = (valor) => {
    let v = valor.replace(/\D/g, ''); // Tira tudo que não é número
    if (v.length > 11) v = v.slice(0, 11); // Limita a 11 números
    
    if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
    
    setFormData({ ...formData, whatsapp: v });
  };

  // Função de Validação
  const validarDados = () => {
    setErro(''); // Limpa os erros
    
    // Verifica se tem sobrenome (se tem espaço no nome)
    if (formData.nome.trim().split(' ').length < 2) {
      setErro('Por favor, insira seu nome e sobrenome.');
      return false;
    }

    // Verifica se o WhatsApp tem os 10 ou 11 números (ex: 18999999999)
    const numeroLimpo = formData.whatsapp.replace(/\D/g, '');
    if (numeroLimpo.length < 10) {
      setErro('Digite um número de WhatsApp válido com DDD.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Se a validação barrar, para tudo por aqui
    if (!validarDados()) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('inscritos')
        .insert([formData]);

      if (error) throw error;

      window.location.href = LINK_WHATSAPP;
      
    } catch (error) {
      setErro("Erro de conexão ao salvar. Tente de novo!");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    // Fundo cor de papel claro
    <div className="min-h-screen bg-[#f3f1eb] flex items-center justify-center p-4 font-sans">
      
      {/* Container principal com borda grossa e sombra dura (estilo brutalista) */}
      <div className="w-full max-w-md bg-white rounded-xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Detalhe visual de colagem no topo */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#DB8D9B] via-[#F5C24D] to-[#67B8C1]"></div>

        <div className="text-center mb-8 mt-4">
          <p className="text-black font-extrabold text-sm tracking-widest mb-1">
            2° CONFERÊNCIA
          </p>
          <h1 className="text-4xl font-black text-[#F5C24D] uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px #000' }}>
            DESPERTANDO
          </h1>
          <div className="mt-2 space-y-1">
            <span className="inline-block bg-[#67B8C1] text-black font-black px-3 py-1 transform -rotate-2">
              SUA IDENTIDADE
            </span>
            <br/>
            <span className="inline-block bg-white border-2 border-black text-black font-black px-3 py-1 text-xl transform rotate-2">
              EM CRISTO
            </span>
          </div>
        </div>

        {/* Mensagem de Erro Vermelha (só aparece se der erro) */}
        {erro && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 font-bold text-sm">
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-black text-sm font-bold mb-1 block">Nome Completo</label>
            <input 
              required
              className="w-full bg-stone-50 border-2 border-black rounded-md px-4 py-3 text-black font-medium focus:outline-none focus:ring-0 focus:border-[#67B8C1] focus:bg-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
              placeholder="Ex: João da Silva"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="text-black text-sm font-bold mb-1 block">WhatsApp</label>
            <input 
              required
              type="tel"
              className="w-full bg-stone-50 border-2 border-black rounded-md px-4 py-3 text-black font-medium focus:outline-none focus:ring-0 focus:border-[#DB8D9B] focus:bg-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
              placeholder="(18) 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => handleMascaraTelefone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-black text-sm font-bold mb-1 block">Qual sua Igreja/Congregação?</label>
            <input 
              required
              className="w-full bg-stone-50 border-2 border-black rounded-md px-4 py-3 text-black font-medium focus:outline-none focus:ring-0 focus:border-[#F5C24D] focus:bg-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
              placeholder="Sua igreja local"
              value={formData.congregacao}
              onChange={(e) => setFormData({...formData, congregacao: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#F5C24D] border-2 border-black text-black font-black uppercase tracking-wider py-4 rounded-md transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400"
          >
            {loading ? 'Processando...' : 'Entrar no Grupo'}
          </button>
        </form>
      </div>
    </div>
  );
}