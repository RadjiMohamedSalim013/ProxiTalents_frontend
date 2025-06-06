import { FaHandshake, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

export default function ValeursSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Nos <span className="text-amber-500">valeurs</span> fondamentales
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Les principes qui guident chacune de nos actions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaHandshake className="w-10 h-10" />,
              title: "Confiance",
              desc: "Relations transparentes et sécurisées"
            },
            {
              icon: <FaLightbulb className="w-10 h-10" />,
              title: "Innovation",
              desc: "Solutions modernes pour vos besoins"
            },
            {
              icon: <FaUsers className="w-10 h-10" />,
              title: "Communauté",
              desc: "Réseau solidaire et bienveillant"
            },
            {
              icon: <FaChartLine className="w-10 h-10" />,
              title: "Croissance",
              desc: "Développement mutuel et durable"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}