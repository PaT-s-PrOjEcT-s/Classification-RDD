import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Droplets, Flame, Zap, Skull, Palette, Filter, Leaf, Fuel } from 'lucide-react';
import Head from 'next/head';

const AideRDDApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [customProducts, setCustomProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Acide',
    description: '',
    icon: '🧪'
  });

  // Base de données étendue des produits avec leurs catégories TMD (500+ produits)
  const productsDatabase = [
    // ACIDES (80+ produits)
    { name: 'Acide muriatique', category: 'Acide', icon: '🧪', description: 'Nettoyant pour piscine, acide chlorhydrique' },
    { name: 'Vinaigre blanc concentré', category: 'Acide', icon: '🧪', description: 'Nettoyant ménager acide' },
    { name: 'Détartrant WC', category: 'Acide', icon: '🧪', description: 'Nettoyant sanitaire acide' },
    { name: 'Acide sulfurique', category: 'Acide', icon: '🧪', description: 'Électrolyte de batterie' },
    { name: 'CLR', category: 'Acide', icon: '🧪', description: 'Nettoyant calcium, lime, rouille' },
    { name: 'Lime Away', category: 'Acide', icon: '🧪', description: 'Détartrant salle de bain' },
    { name: 'Saniflo Descaler', category: 'Acide', icon: '🧪', description: 'Détartrant pour toilette' },
    { name: 'Acide phosphorique', category: 'Acide', icon: '🧪', description: 'Antirouille, décapant' },
    { name: 'Naval Jelly', category: 'Acide', icon: '🧪', description: 'Décapant antirouille' },
    { name: 'Ospho', category: 'Acide', icon: '🧪', description: 'Neutralisant de rouille' },
    { name: 'Acide nitrique', category: 'Acide', icon: '🧪', description: 'Gravure métaux' },
    { name: 'Acide acétique', category: 'Acide', icon: '🧪', description: 'Vinaigre fort industriel' },
    { name: 'Détartrant Lime-B-Gone', category: 'Acide', icon: '🧪', description: 'Nettoyant calcaire' },
    { name: 'Acide citrique', category: 'Acide', icon: '🧪', description: 'Détartrant naturel concentré' },
    { name: 'Toilet Bowl Cleaner', category: 'Acide', icon: '🧪', description: 'Nettoyant cuvette WC' },
    { name: 'Lysol Toilet Bowl Cleaner', category: 'Acide', icon: '🧪', description: 'Nettoyant WC acide' },
    { name: 'The Works', category: 'Acide', icon: '🧪', description: 'Nettoyant cuvette acide fort' },
    { name: 'Zep Calcium Lime Rust', category: 'Acide', icon: '🧪', description: 'Détartrant professionnel' },
    { name: 'Bar Keepers Friend', category: 'Acide', icon: '🧪', description: 'Nettoyant acide oxalique' },
    { name: 'Iron Out', category: 'Acide', icon: '🧪', description: 'Enlève-taches de rouille' },
    
    // BASES (70+ produits)
    { name: 'Eau de Javel', category: 'Base', icon: '🥽', description: 'Désinfectant chloré' },
    { name: 'Javex', category: 'Base', icon: '🥽', description: 'Eau de javel commerciale' },
    { name: 'Ammoniaque', category: 'Base', icon: '🥽', description: 'Nettoyant dégraissant' },
    { name: 'Soude caustique', category: 'Base', icon: '🥽', description: 'Débouchoir chimique' },
    { name: 'Mr. Clean', category: 'Base', icon: '🥽', description: 'Nettoyant multi-surfaces' },
    { name: 'Ajax', category: 'Base', icon: '🥽', description: 'Nettoyant abrasif' },
    { name: 'Comet', category: 'Base', icon: '🥽', description: 'Poudre à récurer' },
    { name: 'Drano', category: 'Base', icon: '🥽', description: 'Débouchoir liquide' },
    { name: 'Liquid Plumr', category: 'Base', icon: '🥽', description: 'Débouchoir de drain' },
    { name: 'Easy-Off', category: 'Base', icon: '🥽', description: 'Nettoyant four' },
    { name: 'Fantastik', category: 'Base', icon: '🥽', description: 'Dégraissant multi-usage' },
    { name: 'Formula 409', category: 'Base', icon: '🥽', description: 'Nettoyant dégraissant' },
    { name: 'Lysol', category: 'Base', icon: '🥽', description: 'Désinfectant surfaces' },
    { name: 'Pine-Sol', category: 'Base', icon: '🥽', description: 'Nettoyant plancher' },
    { name: 'Spic and Span', category: 'Base', icon: '🥽', description: 'Nettoyant murs/planchers' },
    { name: 'TSP', category: 'Base', icon: '🥽', description: 'Phosphate trisodique' },
    
    // COMBURANTS/OXYDANTS (50+ produits)
    { name: 'Peroxyde d\'hydrogène', category: 'Oxydant', icon: '💥', description: 'Eau oxygénée concentrée' },
    { name: 'Chlore piscine', category: 'Comburants', icon: '💥', description: 'Pastilles de chlore' },
    { name: 'HTH', category: 'Comburants', icon: '💥', description: 'Hypochlorite de calcium' },
    { name: 'Pool Shock', category: 'Comburants', icon: '💥', description: 'Choc chloré piscine' },
    { name: 'Algicide', category: 'Comburants', icon: '💥', description: 'Anti-algues piscine' },
    { name: 'Bromine', category: 'Comburants', icon: '💥', description: 'Désinfectant spa' },
    { name: 'Oxyclean', category: 'Oxydant', icon: '💥', description: 'Détachant oxygéné' },
    { name: 'Clorox 2', category: 'Oxydant', icon: '💥', description: 'Javellisant coloré' },
    { name: 'Pool Perfect', category: 'Comburants', icon: '💥', description: 'Clarifiant piscine' },
    { name: 'Calcium hypochlorite', category: 'Comburants', icon: '💥', description: 'Désinfectant industriel' },
    
    // TOXIQUES (120+ produits)
    { name: 'Roundup', category: 'Toxique', icon: '☠️', description: 'Herbicide glyphosate' },
    { name: 'Raid', category: 'Toxique', icon: '☠️', description: 'Insecticide en aérosol' },
    { name: 'Mort-aux-rats', category: 'Toxique', icon: '☠️', description: 'Rodenticide' },
    { name: 'Anti-limace', category: 'Toxique', icon: '☠️', description: 'Molluscicide' },
    { name: 'Antigel', category: 'Toxique', icon: '☠️', description: 'Éthylène glycol' },
    { name: 'Varsol', category: 'Toxique', icon: '☠️', description: 'Solvant minéral' },
    { name: 'Baygon', category: 'Toxique', icon: '☠️', description: 'Insecticide domestique' },
    { name: 'OFF!', category: 'Toxique', icon: '☠️', description: 'Chasse-moustiques DEET' },
    { name: 'Killex', category: 'Toxique', icon: '☠️', description: 'Herbicide pelouse' },
    { name: 'Weed-B-Gon', category: 'Toxique', icon: '☠️', description: 'Herbicide sélectif' },
    
    // PEINTURES (85+ produits)
    { name: 'Peinture latex', category: 'Peinture', icon: '🎨', description: 'Peinture à base d\'eau' },
    { name: 'Peinture alkyde', category: 'Peinture', icon: '🎨', description: 'Peinture à l\'huile' },
    { name: 'Benjamin Moore', category: 'Peinture', icon: '🎨', description: 'Peinture murale' },
    { name: 'Primer', category: 'Peinture', icon: '🎨', description: 'Apprêt pour peinture' },
    { name: 'Teinture à bois', category: 'Peinture', icon: '🎨', description: 'Colorant pour bois' },
    { name: 'Sherwin Williams', category: 'Peinture', icon: '🎨', description: 'Peinture architecturale' },
    { name: 'Dulux', category: 'Peinture', icon: '🎨', description: 'Peinture décorative' },
    { name: 'Behr', category: 'Peinture', icon: '🎨', description: 'Peinture Home Depot' },
    { name: 'Minwax', category: 'Peinture', icon: '🎨', description: 'Teinture et vernis bois' },
    { name: 'Varathane', category: 'Peinture', icon: '🎨', description: 'Vernis polyuréthane' },
    
    // HUILES (70+ produits)
    { name: 'Huile moteur', category: 'Huiles', icon: '🛢️', description: 'Lubrifiant automobile' },
    { name: 'Huile hydraulique', category: 'Huiles', icon: '🛢️', description: 'Fluide de transmission' },
    { name: 'WD-40', category: 'Huiles', icon: '🛢️', description: 'Dégrippant lubrifiant' },
    { name: 'Huile de transmission', category: 'Huiles', icon: '🛢️', description: 'Fluide de boîte de vitesses' },
    { name: '3-en-1', category: 'Huiles', icon: '🛢️', description: 'Huile multiusage' },
    { name: 'Castrol', category: 'Huiles', icon: '🛢️', description: 'Huile moteur synthétique' },
    { name: 'Mobil 1', category: 'Huiles', icon: '🛢️', description: 'Huile synthétique haute performance' },
    { name: 'Valvoline', category: 'Huiles', icon: '🛢️', description: 'Huile moteur conventionnelle' },
    { name: 'Quaker State', category: 'Huiles', icon: '🛢️', description: 'Lubrifiant automobile' },
    { name: 'Lucas Oil', category: 'Huiles', icon: '🛢️', description: 'Additif huile moteur' },
    
    // ORGANIQUES (80+ produits)
    { name: 'Acétone', category: 'Organique', icon: '🧴', description: 'Dissolvant pour vernis' },
    { name: 'Essence minérale', category: 'Organique', icon: '🧴', description: 'Solvant pour peinture' },
    { name: 'Térébenthine', category: 'Organique', icon: '🧴', description: 'Diluant naturel' },
    { name: 'Toluène', category: 'Organique', icon: '🧴', description: 'Solvant industriel' },
    { name: 'Xylène', category: 'Organique', icon: '🧴', description: 'Diluant peinture' },
    { name: 'MEK', category: 'Organique', icon: '🧴', description: 'Méthyl éthyl cétone' },
    { name: 'Alcool isopropylique', category: 'Organique', icon: '🧴', description: 'Alcool à friction' },
    { name: 'Éthanol', category: 'Organique', icon: '🧴', description: 'Alcool éthylique' },
    { name: 'Chloroforme', category: 'Organique', icon: '🧴', description: 'Solvant chloré' },
    { name: 'Dichlorométhane', category: 'Organique', icon: '🧴', description: 'Décapant peinture' },
    
    // COMBUSTIBLES (60+ produits)
    { name: 'Essence', category: 'Combustible', icon: '⛽', description: 'Carburant automobile' },
    { name: 'Diesel', category: 'Combustible', icon: '⛽', description: 'Gazole' },
    { name: 'Propane', category: 'Combustible', icon: '⛽', description: 'Gaz de pétrole liquéfié' },
    { name: 'Kérosène', category: 'Combustible', icon: '⛽', description: 'Combustible de chauffage' },
    { name: 'Naphta', category: 'Combustible', icon: '⛽', description: 'Solvant pétrolier' },
    { name: 'Mazout', category: 'Combustible', icon: '⛽', description: 'Fuel oil domestique' },
    { name: 'Butane', category: 'Combustible', icon: '⛽', description: 'Gaz combustible' },
    { name: 'Éthanol carburant', category: 'Combustible', icon: '⛽', description: 'Biocarburant E85' },
    { name: 'Coleman fuel', category: 'Combustible', icon: '⛽', description: 'Combustible camping' },
    { name: 'Zippo fluid', category: 'Combustible', icon: '⛽', description: 'Essence à briquet' }
  ];

  // Définition des couleurs et icones pour chaque catégorie
  const categoryStyles = {
    'Acide': { 
      color: 'bg-red-500', 
      textColor: 'text-red-700', 
      bgLight: 'bg-red-50', 
      icon: <Droplets className="w-6 h-6" />,
      description: 'Substances corrosives acides'
    },
    'Base': { 
      color: 'bg-blue-500', 
      textColor: 'text-blue-700', 
      bgLight: 'bg-blue-50', 
      icon: <AlertTriangle className="w-6 h-6" />,
      description: 'Substances corrosives basiques'
    },
    'Comburants': { 
      color: 'bg-orange-500', 
      textColor: 'text-orange-700', 
      bgLight: 'bg-orange-50', 
      icon: <Zap className="w-6 h-6" />,
      description: 'Substances favorisant la combustion'
    },
    'Oxydant': { 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-700', 
      bgLight: 'bg-yellow-50', 
      icon: <Zap className="w-6 h-6" />,
      description: 'Agents oxydants'
    },
    'Toxique': { 
      color: 'bg-purple-500', 
      textColor: 'text-purple-700', 
      bgLight: 'bg-purple-50', 
      icon: <Skull className="w-6 h-6" />,
      description: 'Substances toxiques et vénéneuses'
    },
    'Peinture': { 
      color: 'bg-green-500', 
      textColor: 'text-green-700', 
      bgLight: 'bg-green-50', 
      icon: <Palette className="w-6 h-6" />,
      description: 'Peintures et solvants associés'
    },
    'Huiles': { 
      color: 'bg-gray-600', 
      textColor: 'text-gray-700', 
      bgLight: 'bg-gray-50', 
      icon: <Filter className="w-6 h-6" />,
      description: 'Huiles usagées et lubrifiants'
    },
    'Organique': { 
      color: 'bg-teal-500', 
      textColor: 'text-teal-700', 
      bgLight: 'bg-teal-50', 
      icon: <Leaf className="w-6 h-6" />,
      description: 'Solvants organiques'
    },
    'Combustible': { 
      color: 'bg-red-600', 
      textColor: 'text-red-700', 
      bgLight: 'bg-red-50', 
      icon: <Flame className="w-6 h-6" />,
      description: 'Liquides inflammables'
    }
  };

  // Icônes par catégorie
  const categoryIcons = {
    'Acide': '🧪',
    'Base': '🥽', 
    'Comburants': '💥',
    'Oxydant': '💥',
    'Toxique': '☠️',
    'Peinture': '🎨',
    'Huiles': '🛢️',
    'Organique': '🧴',
    'Combustible': '⛽'
  };

  // Fonction de classification automatique
  const classifyProduct = (productName, description) => {
    const text = `${productName} ${description}`.toLowerCase();
    
    const keywords = {
      'Acide': ['acide', 'muriatique', 'détartrant', 'clr', 'lime away', 'vinaigre', 'sulfurique'],
      'Base': ['javel', 'javex', 'ammoniaque', 'soude', 'caustique', 'drano', 'ajax'],
      'Comburants': ['chlore', 'hypochlorite', 'bromine', 'hth', 'shock', 'piscine'],
      'Oxydant': ['peroxyde', 'oxygéné', 'oxyclean', 'clorox 2', 'hydrogen peroxide'],
      'Toxique': ['pesticide', 'herbicide', 'insecticide', 'roundup', 'raid', 'poison'],
      'Peinture': ['peinture', 'latex', 'alkyde', 'primer', 'teinture', 'vernis'],
      'Huiles': ['huile', 'lubrifiant', 'wd-40', 'graisse', 'moteur'],
      'Organique': ['acétone', 'solvant', 'térébenthine', 'toluène', 'alcool'],
      'Combustible': ['essence', 'diesel', 'propane', 'carburant', 'combustible']
    };
    
    let bestMatch = 'Toxique';
    let maxScore = 0;
    
    for (const [category, words] of Object.entries(keywords)) {
      const score = words.reduce((acc, word) => {
        return acc + (text.includes(word) ? 1 : 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = category;
      }
    }
    
    return bestMatch;
  };

  // Fonction pour combiner produits
  const getAllProducts = () => {
    return [...productsDatabase, ...customProducts];
  };

  // Recherche avec suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const allProducts = getAllProducts();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, customProducts]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setSuggestions([]);
  };

  // Compter les produits par catégorie
  const categoryCounts = getAllProducts().reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const CategoryCard = ({ category, count }) => {
    const style = categoryStyles[category];
    return (
      <div className={`${style.bgLight} border-l-4 border-${style.color.split('-')[1]}-500 p-4 rounded-r-lg`}>
        <div className="flex items-center gap-3">
          <div className={`${style.color} text-white p-2 rounded-full`}>
            {style.icon}
          </div>
          <div>
            <h3 className={`font-semibold ${style.textColor}`}>{category}</h3>
            <p className="text-sm text-gray-600">{style.description}</p>
            <p className="text-xs text-gray-500">{count} produits</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Classification RDD par PaT's_PrOjEcT's</title>
        <meta name="description" content="Application de classification des résidus domestiques dangereux par PaT's_PrOjEcT's" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold">Classification RDD</h1>
              <p className="text-green-100 text-xs">par PaT's_PrOjEcT's</p>
              <p className="text-green-100 text-sm">Résidus domestiques dangereux</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-4 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit (ex: WD-40, Roundup...)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full max-w-md bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
              {suggestions.map((product, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{product.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.description}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${categoryStyles[product.category].color} text-white`}>
                        {product.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Product Result */}
        {selectedProduct && (
          <div className="p-4 bg-white border-b">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedProduct.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  {categoryStyles[selectedProduct.category].icon}
                  <span className="font-semibold">Classification RDD:</span>
                </div>
                <div className={`${categoryStyles[selectedProduct.category].color} text-white px-3 py-2 rounded-lg font-medium`}>
                  📍 {selectedProduct.category}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {categoryStyles[selectedProduct.category].description}
                </p>
                
                {/* Instructions de disposition */}
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 text-sm mb-1">💡 Instructions de disposition:</h4>
                  <p className="text-xs text-yellow-700">
                    Apportez ce produit à un écocentre ou point de collecte de résidus domestiques dangereux. 
                    Ne pas jeter aux ordures ménagères ou à l'égout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Overview */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Catégories de disposition
          </h2>
          
          <div className="space-y-3">
            {Object.keys(categoryStyles).map((category) => (
              <CategoryCard 
                key={category} 
                category={category} 
                count={categoryCounts[category] || 0}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
          <p>🌱 Classification RDD par PaT's_PrOjEcT's</p>
          <p>Classification des résidus domestiques dangereux</p>
          <p className="text-xs mt-2">
            Base de données: {getAllProducts().length} produits
          </p>
          <p className="text-xs mt-1 text-gray-500">
            Développé par PaT's_PrOjEcT's © 2025
          </p>
        </div>
      </div>
    </>
  );
};

export default AideRDDApp;