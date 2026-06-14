import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);

    // Futuramente:
    // Inicializar Google Analytics
    // Inicializar Meta Pixel
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto">
      <div className="bg-roxo-escuro border border-dourado-accent/30 rounded-2xl shadow-2xl p-5">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div>
            <a
                href="/politica-de-privacidade.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dourado-accent underline"
            >
                Política de Privacidade
            </a>

            <p className="text-white/80 text-sm leading-relaxed">
              Utilizamos cookies para melhorar sua experiência de navegação e
              analisar o tráfego do site. Ao aceitar, você nos ajuda a oferecer
              um atendimento mais personalizado.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
            >
              Recusar
            </button>

            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-lg bg-dourado-accent text-roxo-escuro font-bold hover:opacity-90 transition"
            >
              Aceitar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}