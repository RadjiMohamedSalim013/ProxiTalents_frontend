
export default function PresentationSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Fond avec motif très léger */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 z-0">
        <div className="bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920')] w-full h-full bg-cover"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne image */}
          <div className="order-2 md:order-1">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              {/* Nouvelle image d'équipe qui devrait s'afficher */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                alt="Équipe ProxiTalents en réunion"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';
                }}
              />
            </div>
          </div>

          {/* Colonne texte */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Notre <span className="text-amber-500">histoire</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                ProxiTalents est né de la rencontre entre des professionnels passionnés et une conviction forte :
                chaque talent mérite d'être visible et chaque besoin trouve sa solution localement.
              </p>
              <p>
                Depuis 2023, nous construisons des ponts entre les compétences locales et les opportunités professionnelles.
              </p>
            </div>

            {/* Chiffres clés */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[ 
                { value: "500+", label: "Professionnels" },
                { value: "10k+", label: "Utilisateurs" },
                { value: "100%", label: "Satisfaction" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-amber-500">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}