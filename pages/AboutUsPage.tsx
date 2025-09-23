import React from 'react';
import { LogoIcon, HandshakeIcon, SparklesIcon, LayersIcon, CursorArrowIcon } from '../components/Icons';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover object-center"
            src="https://picsum.photos/seed/aboutus-hero/1920/1080"
            alt="Oglasi Srbija Team"
          />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">O Nama</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Povezujemo zajednicu Srbije, jedan po jedan oglas.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Naša Priča</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            OglasiSrbija je nastao iz jednostavne ideje: stvoriti modernu, pouzdanu i jednostavnu platformu koja će služiti kao centralno mesto za kupovinu i prodaju u Srbiji. U digitalnom dobu, verujemo da svako zaslužuje efikasan način da pronađe ono što mu treba ili da proda ono što mu više nije potrebno, bez obzira da li je reč o automobilu, stanu, poslu ili kućnom ljubimcu.
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
                <div className="flex items-center gap-x-3">
                    <HandshakeIcon className="h-10 w-10 text-blue-600" />
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Naša Misija</h3>
                </div>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Naša misija je da osnažimo pojedince i preduzeća širom Srbije pružajući im intuitivnu i sigurnu platformu za trgovinu. Težimo da pojednostavimo proces oglašavanja, činimoći ga dostupnim svima, i da izgradimo zajednicu zasnovanu na poverenju i međusobnoj koristi.
              </p>
            </div>
          </div>
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
                <div className="flex items-center gap-x-3">
                    <SparklesIcon className="h-10 w-10 text-orange-500" />
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Naša Vizija</h3>
                </div>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Naša vizija je da postanemo vodeća digitalna tržnica u regionu, prepoznata po inovacijama, korisničkoj podršci i pozitivnom uticaju na lokalnu ekonomiju. Želimo da budemo više od platforme za oglase - želimo da budemo partner u svakodnevnom životu naših korisnika.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900">Naše Vrednosti</h2>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                        <LayersIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Poverenje</h4>
                    <p className="text-gray-600">Gradimo transparentnu zajednicu u kojoj se korisnici osećaju sigurno.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                        <CursorArrowIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Jednostavnost</h4>
                    <p className="text-gray-600">Dizajniramo intuitivna rešenja koja olakšavaju korišćenje platforme.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                        <LogoIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Zajednica</h4>
                    <p className="text-gray-600">Povezujemo ljude i podržavamo lokalni razvoj i ekonomiju.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;