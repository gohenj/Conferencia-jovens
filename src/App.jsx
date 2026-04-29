import  { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ⚠️ COLOQUE SUAS CHAVES DO SUPABASE AQUI ⚠️
const supabaseUrl = 'https://nbswjlupppitnpywtoip.supabase.co';
const supabaseKey = 'sb_publishable_3-F_GVA2274jWbeMek8nuQ_POcsEjEd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', congregacao: '' });

  // ⚠️ COLOQUE O LINK DO GRUPO DO WHATSAPP AQUI ⚠️
  const LINK_WHATSAPP = "https://chat.whatsapp.com/EafbP8aRz1K0DjQigJLN8B";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envia os dados para a tabela 'inscritos' no Supabase
      const { error } = await supabase
        .from('inscritos')
        .insert([formData]);

      if (error) throw error;

      // Redireciona para o grupo do WhatsApp
      window.location.href = LINK_WHATSAPP;
      
    } catch (error) {
      alert("Deu erro ao salvar. Tente de novo!");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
        
        <div className="text-center mb-8">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-900/30 px-3 py-1 rounded-full">
            Inscrições Abertas
          </span>
          <h1 className="text-3xl font-black text-white mt-4 tracking-tight">
            CONFERÊNCIA JOVEM
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Preencha seus dados para entrar no grupo oficial.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm font-semibold mb-1 block">Nome Completo</label>
            <input 
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Ex: João Silva"
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold mb-1 block">WhatsApp</label>
            <input 
              required
              type="tel"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="(18) 99999-9999"
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-semibold mb-1 block">Congregação</label>
            <input 
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Sua igreja local"
              onChange={(e) => setFormData({...formData, congregacao: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-lg transition-colors"
          >
            {loading ? 'SALVANDO...' : 'ENTRAR NO GRUPO'}
          </button>
        </form>

      </div>
    </div>
  );
}